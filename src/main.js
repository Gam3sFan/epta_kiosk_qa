const path = require('path');
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { autoUpdater } = require('electron-updater');
const {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} = require('fs');

const packageJson = require('../package.json');
const TARGET_ASPECT_RATIO = 9 / 16;
const AUTO_UPDATE_INTERVAL_MS = 1000 * 60 * 60 * 4;
const UPDATE_INSTALL_COUNTDOWN_SECONDS = 30;
const UPDATE_INSTALL_RETRY_MS = 1000 * 60 * 30;
const isDev = process.env.NODE_ENV === 'development';
const allowDevAutoUpdate = process.env.AUTO_UPDATE_ENABLE_DEV === 'true';
const customFeedUrl = process.env.AUTO_UPDATE_FEED_URL;
const PLACEHOLDER_OWNER = 'your-github-owner';
const PLACEHOLDER_REPO = 'your-release-repo';
const UPDATE_CHANNEL = 'app:autoUpdate';
const UPDATER_STATUS_CHANNEL = 'updater:status';
const isProduction = app.isPackaged;
const shouldAutoUpdate = (isProduction || allowDevAutoUpdate) && process.platform === 'win32';

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
const getWindowBounds = () => {
  const { workArea } = screen.getPrimaryDisplay()
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

const createWindow = () => {
  const iconPath = path.join(__dirname, 'epta_icon_qa.ico');
  const { width, height, x, y } = getWindowBounds()
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
  
  if (OPEN_ON_SECONDARY_VERTICAL_SCREEN) {
    const displays = screen.getAllDisplays();
    const primaryDisplay = screen.getPrimaryDisplay();

    // Try to find a secondary display that is vertical (portrait)
    let targetDisplay = displays.find((display) => {
      return display.id !== primaryDisplay.id && display.bounds.height > display.bounds.width;
    });

    // If no vertical secondary display found, try any secondary display
    if (!targetDisplay) {
      targetDisplay = displays.find((display) => display.id !== primaryDisplay.id);
    }

    if (targetDisplay) {
      windowOptions.x = targetDisplay.bounds.x;
      windowOptions.y = targetDisplay.bounds.y;
    }
  }

  mainWindow = new BrowserWindow(windowOptions);

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
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



  mainWindow.setAspectRatio(9 / 16);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(() => {
  registerUpdateIpcHandlers();
  registerAnalyticsIpcHandlers();
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
