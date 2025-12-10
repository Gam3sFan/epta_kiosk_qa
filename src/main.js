const path = require('path');
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { autoUpdater } = require('electron-updater');

const packageJson = require('../package.json');

const isDev = process.env.NODE_ENV === 'development';
const allowDevAutoUpdate = process.env.AUTO_UPDATE_ENABLE_DEV === 'true';
const customFeedUrl = process.env.AUTO_UPDATE_FEED_URL;
const PLACEHOLDER_OWNER = 'your-github-owner';
const PLACEHOLDER_REPO = 'your-release-repo';
const UPDATE_CHANNEL = 'app:autoUpdate';

// Configuration for window positioning
// Set to true to attempt opening on a secondary vertical screen
const OPEN_ON_SECONDARY_VERTICAL_SCREEN = true;

let mainWindow;
let autoUpdateConfigured = false;
let autoUpdateHandlersRegistered = false;

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

const sendAutoUpdateEvent = (state, payload = {}) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(UPDATE_CHANNEL, { state, ...payload });
  }
};

const registerAutoUpdaterEvents = () => {
  if (autoUpdateHandlersRegistered) {
    return;
  }
  autoUpdateHandlersRegistered = true;

  autoUpdater.on('checking-for-update', () => {
    console.info('[auto-updater] Checking for updates');
    sendAutoUpdateEvent('checking');
  });

  autoUpdater.on('update-available', (info) => {
    console.info('[auto-updater] Update available', info?.version);
    sendAutoUpdateEvent('available', { version: info?.version || null });
  });

  autoUpdater.on('update-not-available', (info) => {
    console.info('[auto-updater] No update available');
    sendAutoUpdateEvent('not-available', { version: info?.version || null });
  });

  autoUpdater.on('download-progress', (progress) => {
    sendAutoUpdateEvent('download-progress', {
      percent: Math.round(progress.percent ?? 0),
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total,
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.info('[auto-updater] Update downloaded, restarting to install', info?.version);
    sendAutoUpdateEvent('downloaded', { version: info?.version || null });
    setTimeout(() => {
      autoUpdater.quitAndInstall(false, true);
    }, 1000);
  });

  autoUpdater.on('error', (error) => {
    console.error('[auto-updater] Error while updating', error);
    sendAutoUpdateEvent('error', { message: error?.message || 'Unknown auto-update error' });
  });
};

const registerUpdateIpcHandlers = () => {
  ipcMain.handle('app:getVersion', () => app.getVersion());

  ipcMain.handle('updates:check', async () => {
    if (!autoUpdateConfigured) {
      return { started: false, reason: 'auto-update-disabled' };
    }

    try {
      await autoUpdater.checkForUpdates();
      return { started: true };
    } catch (error) {
      console.error('[auto-updater] Manual check failed', error);
      return { started: false, reason: error?.message || 'Unknown auto-update error' };
    }
  });

  ipcMain.handle('updates:install', () => {
    if (!autoUpdateConfigured) {
      return false;
    }

    autoUpdater.quitAndInstall(false, true);
    return true;
  });
};

const initAutoUpdater = () => {
  if (!app.isPackaged && !allowDevAutoUpdate) {
    console.info('[auto-updater] Disabled in development/unpackaged mode');
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

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.setFeedURL(feedConfig);

  registerAutoUpdaterEvents();
  autoUpdateConfigured = true;

  autoUpdater
    .checkForUpdates()
    .catch((error) => console.error('[auto-updater] Initial check failed', error));
};

const createWindow = () => {
  const iconPath = path.join(__dirname, 'epta_icon_qa.ico');

<<<<<<< HEAD
  let windowOptions = {
    width: 1080,
    height: 1920,
    minWidth: 720,
    minHeight: 1280,
=======
  mainWindow = new BrowserWindow({
    width: 540,
    height: 960,
    minWidth: 540,
    minHeight: 960,
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
    backgroundColor: '#f3f3f3',
    show: false,
    kiosk: false,
    fullscreen: false,
    autoHideMenuBar: true,
    fullscreenable: false,
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
