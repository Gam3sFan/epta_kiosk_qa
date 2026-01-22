const path = require('path');
const { spawn } = require('child_process');
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const http = require('http');
const https = require('https');
const { autoUpdater } = require('electron-updater');
const {
  appendFileSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} = require('fs');
const { createHash } = require('crypto');
const { pathToFileURL } = require('url');

const packageJson = require('../package.json');
const TARGET_ASPECT_RATIO = 9 / 16;
const AUTO_UPDATE_INTERVAL_MS = 1000 * 60 * 60 * 4;
const UPDATE_INSTALL_COUNTDOWN_SECONDS = 30;
const UPDATE_INSTALL_RETRY_MS = 1000 * 60 * 30;
const UI_SCALE_MIN = 0.8;
const UI_SCALE_MAX = 2.0;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const ESSENTIAL_TRAIL_PDF_RELATIVE = path.join('public', 'paths', 'essential_trail.pdf');
const PRINT_HELPER_FILENAMES = ['print-helper.exe', 'PDFtoPrinter.exe'];
const isDev = process.env.NODE_ENV === 'development';
const allowDevAutoUpdate = process.env.AUTO_UPDATE_ENABLE_DEV === 'true';
const customFeedUrl = process.env.AUTO_UPDATE_FEED_URL;
const PLACEHOLDER_OWNER = 'your-github-owner';
const PLACEHOLDER_REPO = 'your-release-repo';
const UPDATE_CHANNEL = 'app:autoUpdate';
const UPDATER_STATUS_CHANNEL = 'updater:status';
const isProduction = app.isPackaged;
const shouldAutoUpdate = (isProduction || allowDevAutoUpdate) && process.platform === 'win32';
const PRINT_DEVICE_NAME = process.env.PRINT_DEVICE_NAME?.trim() || null;
const PRINT_SILENT = process.env.PRINT_SILENT !== 'false';
const PRINT_HELPER_PATH = process.env.PRINT_HELPER_PATH?.trim() || null;
const PRINT_HELPER_ARGS_RAW = process.env.PRINT_HELPER_ARGS || '';
const PRINT_HELPER_TIMEOUT_MS = Number.parseInt(process.env.PRINT_HELPER_TIMEOUT_MS, 10) || 20000;

// Configuration for window positioning
// Set to true to attempt opening on a secondary vertical screen
const OPEN_ON_SECONDARY_VERTICAL_SCREEN = true;

let mainWindow;
let autoUpdateConfigured = false;
let autoUpdateHandlersRegistered = false;
let lastUpdateStatus = null;
let installCountdownInterval = null;
let installRetryTimer = null;
let pendingUpdateInfo = null;
let analyticsFilePath = null;
const cacheDir = path.join(app.getPath('userData'), 'asset-cache');
const cacheInFlight = new Map();
const clampUiScale = (value) => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(Math.max(value, UI_SCALE_MIN), UI_SCALE_MAX);
};
const initialUiScaleRaw = Number.parseFloat(process.env.UI_SCALE);
let currentUiScale = Number.isFinite(initialUiScaleRaw) ? clampUiScale(initialUiScaleRaw) : 1;

const ensureCacheDir = () => {
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }
};

const getCachePathForUrl = (assetUrl) => {
  const parsedUrl = new URL(assetUrl);
  const ext = path.extname(parsedUrl.pathname) || '.bin';
  const hash = createHash('sha256').update(assetUrl).digest('hex');
  return path.join(cacheDir, `${hash}${ext}`);
};

const getCacheMetaPath = (cachePath) => `${cachePath}.meta.json`;

const readCacheMeta = (cachePath) => {
  const metaPath = getCacheMetaPath(cachePath);
  if (!existsSync(metaPath)) return null;
  try {
    const raw = readFileSync(metaPath, 'utf8');
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
};

const writeCacheMeta = (cachePath, assetUrl) => {
  const metaPath = getCacheMetaPath(cachePath);
  const payload = {
    url: assetUrl,
    cachedAt: Date.now(),
  };
  try {
    writeFileSync(metaPath, JSON.stringify(payload), 'utf8');
  } catch (_error) {
    // Ignore meta write errors.
  }
};

const isValidRemoteUrl = (assetUrl) => /^https?:\/\//i.test(assetUrl);

const downloadToFile = (assetUrl, destinationPath) =>
  new Promise((resolve, reject) => {
    const client = assetUrl.startsWith('https') ? https : http;
    const tempPath = `${destinationPath}.tmp`;
    const request = client.get(assetUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        const redirected = new URL(response.headers.location, assetUrl).toString();
        resolve(downloadToFile(redirected, destinationPath));
        return;
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Download failed (${response.statusCode})`));
        return;
      }

      const fileStream = createWriteStream(tempPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          try {
            renameSync(tempPath, destinationPath);
            resolve(destinationPath);
          } catch (error) {
            try {
              unlinkSync(tempPath);
            } catch (_cleanupError) {}
            reject(error);
          }
        });
      });

      fileStream.on('error', (error) => {
        try {
          unlinkSync(tempPath);
        } catch (_cleanupError) {}
        reject(error);
      });
    });

    request.on('error', (error) => {
      try {
        unlinkSync(tempPath);
      } catch (_cleanupError) {}
      reject(error);
    });

    request.setTimeout(15000, () => {
      request.destroy(new Error('Download timeout'));
    });
  });

const ensureCachedUrl = async (assetUrl) => {
  if (!isValidRemoteUrl(assetUrl)) return null;
  ensureCacheDir();
  const cachePath = getCachePathForUrl(assetUrl);
  const meta = readCacheMeta(cachePath);
  const isFresh = meta?.cachedAt && Date.now() - meta.cachedAt < CACHE_TTL_MS;
  console.info('[cache] Request', assetUrl, { cachePath, isFresh });
  if (existsSync(cachePath)) {
    try {
      const stats = statSync(cachePath);
      if (stats.size > 0 && isFresh) {
        console.info('[cache] Hit', cachePath);
        return pathToFileURL(cachePath).toString();
      }
    } catch (_error) {
      // Fall through to download.
    }
  }

  if (cacheInFlight.has(assetUrl)) {
    return cacheInFlight.get(assetUrl);
  }

  const downloadPromise = downloadToFile(assetUrl, cachePath)
    .then(() => {
      writeCacheMeta(cachePath, assetUrl);
      console.info('[cache] Stored', cachePath);
      return pathToFileURL(cachePath).toString();
    })
    .catch((error) => {
      console.warn('[cache] Failed to cache asset', assetUrl, error?.message || error);
      if (existsSync(cachePath)) {
        try {
          const stats = statSync(cachePath);
          if (stats.size > 0) {
            console.warn('[cache] Using stale cache', cachePath);
            return pathToFileURL(cachePath).toString();
          }
        } catch (_fallbackError) {
          return null;
        }
      }
      return null;
    })
    .finally(() => {
      cacheInFlight.delete(assetUrl);
    });

  cacheInFlight.set(assetUrl, downloadPromise);
  return downloadPromise;
};
const getWindowBounds = (display) => {
  const { workArea } = display || screen.getPrimaryDisplay()
  let height = workArea.height
  let width = Math.round(height * TARGET_ASPECT_RATIO)
  if (width > workArea.width) {
    width = workArea.width
    height = Math.round(width / TARGET_ASPECT_RATIO)
  }
  const x = Math.round(workArea.x + (workArea.width - width) / 2)
  const y = Math.round(workArea.y + (workArea.height - height) / 2)
  return { width, height, x, y }
}
const autoUpdateSettings = (packageJson.config && packageJson.config.autoUpdate) || {};

const getGitHubFeedConfig = () => {
  const owner = process.env.AUTO_UPDATE_GITHUB_OWNER || autoUpdateSettings.githubOwner;
  const repo = process.env.AUTO_UPDATE_GITHUB_REPO || autoUpdateSettings.githubRepo;
  const releaseType = process.env.AUTO_UPDATE_RELEASE_TYPE || autoUpdateSettings.releaseType || 'release';
  const privateRepo =
    typeof process.env.AUTO_UPDATE_GITHUB_PRIVATE !== 'undefined'
      ? process.env.AUTO_UPDATE_GITHUB_PRIVATE === 'true'
      : Boolean(autoUpdateSettings.private);

  if (!owner || !repo || owner === PLACEHOLDER_OWNER || repo === PLACEHOLDER_REPO) {
    return null;
  }

  return { owner, repo, releaseType, privateRepo };
};

const sendUpdateStatus = (payload = {}) => {
  const nextStatus = {
    currentVersion: app.getVersion(),
    ...payload,
  };
  if (nextStatus.status && !nextStatus.state) {
    nextStatus.state = nextStatus.status;
  }
  lastUpdateStatus = nextStatus;
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(UPDATE_CHANNEL, nextStatus);
    mainWindow.webContents.send(UPDATER_STATUS_CHANNEL, nextStatus);
  }
};

const clearInstallCountdown = () => {
  if (installCountdownInterval) {
    clearInterval(installCountdownInterval);
    installCountdownInterval = null;
  }
};

const clearInstallRetry = () => {
  if (installRetryTimer) {
    clearTimeout(installRetryTimer);
    installRetryTimer = null;
  }
};

const runInstall = () => {
  sendUpdateStatus({
    status: 'installing',
    availableVersion: pendingUpdateInfo?.version,
  });
  autoUpdater.quitAndInstall(true, true);
};

const startInstallCountdown = (info) => {
  pendingUpdateInfo = info || pendingUpdateInfo;
  if (!pendingUpdateInfo) return;
  clearInstallCountdown();
  clearInstallRetry();
  const endAt = Date.now() + UPDATE_INSTALL_COUNTDOWN_SECONDS * 1000;
  const tick = () => {
    const remainingMs = Math.max(0, endAt - Date.now());
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    sendUpdateStatus({
      status: 'install-countdown',
      availableVersion: pendingUpdateInfo?.version,
      countdownSeconds: remainingSeconds,
    });
    if (remainingMs <= 0) {
      clearInstallCountdown();
      runInstall();
    }
  };
  tick();
  installCountdownInterval = setInterval(tick, 1000);
};

const scheduleInstallRetry = () => {
  clearInstallRetry();
  if (!pendingUpdateInfo) return;
  installRetryTimer = setTimeout(() => {
    startInstallCountdown(pendingUpdateInfo);
  }, UPDATE_INSTALL_RETRY_MS);
};

const registerAutoUpdaterEvents = () => {
  if (autoUpdateHandlersRegistered) {
    return;
  }
  autoUpdateHandlersRegistered = true;

  autoUpdater.on('checking-for-update', () => {
    console.info('[auto-updater] Checking for updates');
    sendUpdateStatus({ status: 'checking' });
  });

  autoUpdater.on('update-available', (info) => {
    console.info('[auto-updater] Update available', info?.version);
    sendUpdateStatus({ status: 'available', availableVersion: info?.version || '' });
  });

  autoUpdater.on('update-not-available', () => {
    console.info('[auto-updater] No update available');
    pendingUpdateInfo = null;
    clearInstallCountdown();
    clearInstallRetry();
    sendUpdateStatus({ status: 'not-available', availableVersion: '' });
  });

  autoUpdater.on('download-progress', (progress) => {
    sendUpdateStatus({
      status: 'downloading',
      progress: Math.round(progress.percent ?? 0),
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.info('[auto-updater] Update downloaded, preparing install', info?.version);
    startInstallCountdown(info);
  });

  autoUpdater.on('error', (error) => {
    console.error('[auto-updater] Error while updating', error);
    clearInstallCountdown();
    clearInstallRetry();
    sendUpdateStatus({
      status: 'error',
      message: error?.message || 'Unknown auto-update error',
    });
  });
};

const configureAutoUpdater = () => {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;
  registerAutoUpdaterEvents();
};

const scheduleAutoUpdates = () => {
  if (!shouldAutoUpdate || !autoUpdateConfigured) return;
  const runCheck = () => {
    autoUpdater.checkForUpdates().catch((error) => {
      sendUpdateStatus({
        status: 'error',
        message: error?.message || 'Update check failed',
      });
    });
  };
  runCheck();
  setInterval(runCheck, AUTO_UPDATE_INTERVAL_MS);
};

const emitAutoUpdateUnavailable = (message) => {
  if (!shouldAutoUpdate) {
    sendUpdateStatus({ status: isProduction ? 'unsupported' : 'disabled' });
    return;
  }
  sendUpdateStatus({ status: 'disabled', message });
};

const handleManualUpdateCheck = async () => {
  if (!shouldAutoUpdate || !autoUpdateConfigured) {
    emitAutoUpdateUnavailable('Auto update feed not configured');
    return { ok: false, reason: 'auto-update-disabled' };
  }

  try {
    await autoUpdater.checkForUpdates();
    return { ok: true };
  } catch (error) {
    console.error('[auto-updater] Manual check failed', error);
    sendUpdateStatus({
      status: 'error',
      message: error?.message || 'Unknown auto-update error',
    });
    return { ok: false, reason: error?.message || 'Unknown auto-update error' };
  }
};

const registerUpdateIpcHandlers = () => {
  ipcMain.handle('app:getVersion', () => app.getVersion());
  ipcMain.handle('updater:get-version', () => app.getVersion());

  ipcMain.handle('updates:check', async () => {
    const result = await handleManualUpdateCheck();
    return {
      started: result.ok,
      reason: result.ok ? undefined : result.reason,
    };
  });

  ipcMain.handle('updater:check', async () => handleManualUpdateCheck());

  ipcMain.handle('updates:install', () => {
    if (!shouldAutoUpdate || !autoUpdateConfigured) {
      return false;
    }
    runInstall();
    return true;
  });

  ipcMain.handle('updater:cancel-install', () => {
    if (!shouldAutoUpdate || !autoUpdateConfigured) return { ok: false };
    if (!pendingUpdateInfo) return { ok: false };
    clearInstallCountdown();
    sendUpdateStatus({
      status: 'install-cancelled',
      availableVersion: pendingUpdateInfo?.version,
      countdownSeconds: null,
    });
    scheduleInstallRetry();
    return { ok: true };
  });
};

const getAnalyticsPaths = () => {
  const analyticsDir = path.join(app.getPath('userData'), 'analytics');
  const filePath = path.join(analyticsDir, 'session_stats.csv');
  return { analyticsDir, filePath };
};

const ensureAnalyticsFile = () => {
  const { analyticsDir, filePath } = getAnalyticsPaths();
  analyticsFilePath = filePath;
  if (!existsSync(analyticsDir)) {
    mkdirSync(analyticsDir, { recursive: true });
  }
  if (!existsSync(filePath)) {
    writeFileSync(filePath, 'sessionId,timestamp,language,experience,time,result,appVersion\n', 'utf8');
  }
  return filePath;
};

const parseAnalyticsRows = () => {
  const file = ensureAnalyticsFile();
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/).slice(1).filter((line) => Boolean(line.trim()));
  return lines
    .map((line) => {
      const [sessionId, timestamp, language, experience, time, result, appVersion] = line.split(',');
      return { sessionId, timestamp, language, experience, time, result, appVersion };
    })
    .filter(Boolean);
};

const aggregateAnalytics = (rows) => {
  const increment = (obj, key) => {
    const k = key || 'unknown';
    obj[k] = (obj[k] || 0) + 1;
  };

  const summary = {
    totalSessions: rows.length,
    byExperience: {},
    byTime: {},
    byLanguage: {},
    byResult: {},
    lastSessions: rows.slice(-20).reverse(),
  };

  rows.forEach((row) => {
    increment(summary.byExperience, row.experience);
    increment(summary.byTime, row.time);
    increment(summary.byLanguage, row.language);
    increment(summary.byResult, row.result);
  });

  return summary;
};

const registerAnalyticsIpcHandlers = () => {
  ipcMain.handle('analytics:recordSession', (_event, payload = {}) => {
    try {
      const file = ensureAnalyticsFile();
      const sanitized = {
        sessionId: payload.sessionId || `session-${Date.now()}`,
        timestamp: payload.timestamp || new Date().toISOString(),
        language: payload.language || 'unknown',
        experience: payload.experience || 'unknown',
        time: payload.time || 'n/a',
        result: payload.resultKey || 'n/a',
        appVersion: app.getVersion(),
      };
      const line = [
        sanitized.sessionId,
        sanitized.timestamp,
        sanitized.language,
        sanitized.experience,
        sanitized.time,
        sanitized.result,
        sanitized.appVersion,
      ].join(',');
      appendFileSync(file, `${line}\n`, 'utf8');
      return { ok: true, file };
    } catch (error) {
      console.error('[analytics] Failed to record session', error);
      return { ok: false, error: error?.message || 'unknown-error' };
    }
  });

  ipcMain.handle('analytics:getStats', () => {
    try {
      const rows = parseAnalyticsRows();
      const summary = aggregateAnalytics(rows);
      const file = ensureAnalyticsFile();
      return { ok: true, ...summary, file };
    } catch (error) {
      console.error('[analytics] Failed to read stats', error);
      return { ok: false, error: error?.message || 'unknown-error' };
    }
  });

  ipcMain.handle('analytics:reset', () => {
    try {
      const file = ensureAnalyticsFile();
      writeFileSync(file, 'sessionId,timestamp,language,experience,time,result,appVersion\n', 'utf8');
      return { ok: true, file };
    } catch (error) {
      console.error('[analytics] Failed to reset stats', error);
      return { ok: false, error: error?.message || 'unknown-error' };
    }
  });
};

const registerUiScaleIpcHandlers = () => {
  ipcMain.handle('ui:get-scale', () => currentUiScale);
  ipcMain.handle('ui:set-scale', (_event, scale) => {
    const parsed = Number.parseFloat(scale);
    const clamped = clampUiScale(parsed);
    currentUiScale = clamped;
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.setZoomFactor(clamped);
    }
    return clamped;
  });
};

const registerCacheIpcHandlers = () => {
  ipcMain.handle('cache:fetch', async (_event, assetUrl) => {
    if (typeof assetUrl !== 'string' || !assetUrl.trim()) return null;
    return ensureCachedUrl(assetUrl.trim());
  });
};

const resolveEssentialTrailPdfPath = () => {
  const candidates = [
    path.join(app.getAppPath(), ESSENTIAL_TRAIL_PDF_RELATIVE),
    path.join(process.resourcesPath, ESSENTIAL_TRAIL_PDF_RELATIVE),
    path.join(__dirname, '..', ESSENTIAL_TRAIL_PDF_RELATIVE),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
};

const resolvePrintHelperPath = () => {
  if (PRINT_HELPER_PATH) {
    return PRINT_HELPER_PATH;
  }

  const candidates = [];
  for (const filename of PRINT_HELPER_FILENAMES) {
    candidates.push(
      path.join(process.resourcesPath, 'print', filename),
      path.join(app.getAppPath(), 'resources', 'print', filename),
      path.join(__dirname, '..', 'resources', 'print', filename),
    );
  }

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
};

const parsePrintHelperArgs = () => {
  if (!PRINT_HELPER_ARGS_RAW) return [];
  try {
    const parsed = JSON.parse(PRINT_HELPER_ARGS_RAW);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item));
    }
  } catch (_error) {
    // Fall back to whitespace split.
  }

  return PRINT_HELPER_ARGS_RAW.split(/\s+/).filter(Boolean);
};

const buildPrintHelperArgs = (pdfPath, printerName) => {
  const templateArgs = parsePrintHelperArgs();
  if (!templateArgs.length) return [];

  const replacements = {
    '{pdf}': pdfPath,
    '{printer}': printerName || '',
  };

  const resolvedArgs = [];
  for (const arg of templateArgs) {
    let resolved = arg;
    for (const [token, value] of Object.entries(replacements)) {
      resolved = resolved.split(token).join(value);
    }
    if (resolved.trim()) {
      resolvedArgs.push(resolved);
    }
  }

  return resolvedArgs;
};

const resolveDefaultPrinterName = async (webContents) => {
  if (PRINT_DEVICE_NAME) return PRINT_DEVICE_NAME;
  try {
    const printers = await webContents.getPrintersAsync();
    const defaultPrinter = printers.find((printer) => printer.isDefault);
    return defaultPrinter?.name || null;
  } catch (_error) {
    return null;
  }
};

const printPdfViaHelper = (pdfPath, printerName) =>
  new Promise((resolve) => {
    const helperPath = resolvePrintHelperPath();
    if (!helperPath) {
      resolve({ ok: false, reason: 'helper-not-found' });
      return;
    }

    const args = buildPrintHelperArgs(pdfPath, printerName);
    if (!args.length) {
      resolve({ ok: false, reason: 'helper-args-missing' });
      return;
    }

    let settled = false;
    const child = spawn(helperPath, args, {
      windowsHide: true,
      stdio: 'ignore',
    });

    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill();
      resolve({ ok: false, reason: 'helper-timeout' });
    }, PRINT_HELPER_TIMEOUT_MS);

    child.once('error', (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve({ ok: false, reason: 'helper-error', error: error?.message || 'spawn-error' });
    });

    child.once('exit', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve({ ok: code === 0, reason: code === 0 ? 'ok' : 'helper-exit', code });
    });
  });

const printPdfViaElectron = (pdfPath) =>
  new Promise((resolve) => {
    const printWindow = new BrowserWindow({
      show: false,
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        plugins: true,
        sandbox: true,
      },
    });

    const cleanup = () => {
      if (!printWindow.isDestroyed()) {
        printWindow.close();
      }
    };

    const timeoutId = setTimeout(() => {
      console.warn('[print] PDF print timeout');
      cleanup();
      resolve({ ok: false, reason: 'timeout' });
    }, 20000);

    printWindow.webContents.once('did-fail-load', (_event, code, description) => {
      clearTimeout(timeoutId);
      console.warn('[print] PDF load failed', code, description);
      cleanup();
      resolve({ ok: false, reason: 'load-failed', code, description });
    });

    printWindow.webContents.once('did-finish-load', () => {
      setTimeout(async () => {
        const deviceName = await resolveDefaultPrinterName(printWindow.webContents);
        const options = {
          printBackground: true,
          silent: PRINT_SILENT,
        };
        if (deviceName) {
          options.deviceName = deviceName;
        }

        printWindow.webContents.print(options, (success, failureReason) => {
          clearTimeout(timeoutId);
          if (!success) {
            console.warn('[print] Print failed', failureReason);
          } else {
            console.info('[print] Print completed');
          }
          cleanup();
          resolve({ ok: success, reason: failureReason });
        });
      }, 750);
    });

    const fileUrl = pathToFileURL(pdfPath).toString();
    console.info('[print] Loading PDF for print', fileUrl);
    printWindow.loadURL(fileUrl).catch((error) => {
      clearTimeout(timeoutId);
      console.warn('[print] Load URL error', error);
      cleanup();
      resolve({ ok: false, reason: 'load-failed', error: error?.message || 'load-error' });
    });
  });

const printPdfAtPath = async (pdfPath) => {
  if (!pdfPath) {
    return { ok: false, reason: 'file-not-found' };
  }
  if (!existsSync(pdfPath)) {
    return { ok: false, reason: 'file-not-found', path: pdfPath };
  }

  if (process.platform === 'win32') {
    const helperPath = resolvePrintHelperPath();
    if (helperPath) {
      const helperResult = await printPdfViaHelper(pdfPath, PRINT_DEVICE_NAME);
      if (helperResult.ok) {
        return helperResult;
      }
      console.warn('[print] Helper failed, falling back to Electron', helperResult);
    }
  }

  return printPdfViaElectron(pdfPath);
};

const registerPrintIpcHandlers = () => {
  ipcMain.handle('print:essential-trail', async () => {
    const pdfPath = resolveEssentialTrailPdfPath();
    console.info('[print] Resolved essential trail PDF', pdfPath);
    return printPdfAtPath(pdfPath);
  });
  ipcMain.handle('pdf:get-local-url', () => {
    const pdfPath = resolveEssentialTrailPdfPath();
    return pdfPath ? pathToFileURL(pdfPath).toString() : null;
  });
};

const initAutoUpdater = () => {
  if (!shouldAutoUpdate) {
    console.info('[auto-updater] Auto update disabled for this build');
    return;
  }

  let feedConfig = null;
  if (customFeedUrl) {
    feedConfig = { provider: 'generic', url: customFeedUrl };
  } else {
    const ghConfig = getGitHubFeedConfig();
    if (!ghConfig) {
      console.warn(
        '[auto-updater] GitHub owner/repo not configured. Set AUTO_UPDATE_GITHUB_OWNER/AUTO_UPDATE_GITHUB_REPO or package.json config.autoUpdate',
      );
      emitAutoUpdateUnavailable('Auto update feed not configured');
      return;
    }
    feedConfig = {
      provider: 'github',
      owner: ghConfig.owner,
      repo: ghConfig.repo,
      releaseType: ghConfig.releaseType,
      private: ghConfig.privateRepo,
    };
  }

  autoUpdater.setFeedURL(feedConfig);
  configureAutoUpdater();
  autoUpdateConfigured = true;
  scheduleAutoUpdates();
};

const getTargetDisplay = () => {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();
  if (!OPEN_ON_SECONDARY_VERTICAL_SCREEN) {
    return primaryDisplay;
  }

  let targetDisplay = displays.find((display) => {
    return display.id !== primaryDisplay.id && display.bounds.height > display.bounds.width;
  });

  if (!targetDisplay) {
    targetDisplay = displays.find((display) => display.id !== primaryDisplay.id);
  }

  return targetDisplay || primaryDisplay;
};

const createWindow = () => {
  const iconPath = path.join(__dirname, 'epta_icon_qa.ico');
  const targetDisplay = getTargetDisplay();
  const bounds = isProduction ? targetDisplay.bounds : getWindowBounds(targetDisplay);
  const { width, height, x, y } = bounds;
  const windowOptions = {
    width,
    height,
    x,
    y,
    backgroundColor: '#f3f3f3',
    show: false,
    kiosk: isProduction,
    useContentSize: true,
    resizable: false,
    fullscreen: isProduction,
    autoHideMenuBar: true,
    fullscreenable: isProduction,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  };
  mainWindow = new BrowserWindow(windowOptions);

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    if (currentUiScale !== 1) {
      mainWindow.webContents.setZoomFactor(currentUiScale);
    }
    if (!shouldAutoUpdate) {
      sendUpdateStatus({ status: isProduction ? 'unsupported' : 'disabled' });
      return;
    }
    if (lastUpdateStatus) {
      mainWindow.webContents.send(UPDATE_CHANNEL, lastUpdateStatus);
      mainWindow.webContents.send(UPDATER_STATUS_CHANNEL, lastUpdateStatus);
      return;
    }
    sendUpdateStatus({ status: 'idle' });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents
    .setVisualZoomLevelLimits(1, 1)
    .catch((error) => console.warn('[window] Unable to set visual zoom level limits', error));



  if (!isProduction) {
    mainWindow.setAspectRatio(9 / 16);
  }

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  registerUpdateIpcHandlers();
  registerAnalyticsIpcHandlers();
  registerUiScaleIpcHandlers();
  registerCacheIpcHandlers();
  registerPrintIpcHandlers();
  createWindow();
  initAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
