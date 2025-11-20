const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

const packageJson = require('../package.json');

const isDev = process.env.NODE_ENV === 'development';
const PLACEHOLDER_OWNER = 'your-github-owner';
const PLACEHOLDER_REPO = 'your-release-repo';
const UPDATE_CHANNEL = 'app:autoUpdate';

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
  if (isDev || !app.isPackaged) {
    console.info('[auto-updater] Disabled in development/unpackaged mode');
    return;
  }

  const feedConfig = getGitHubFeedConfig();

  if (!feedConfig) {
    console.warn(
      '[auto-updater] GitHub owner/repo not configured. Set AUTO_UPDATE_GITHUB_OWNER/AUTO_UPDATE_GITHUB_REPO env vars or update package.json',
    );
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: feedConfig.owner,
    repo: feedConfig.repo,
    releaseType: feedConfig.releaseType,
    private: feedConfig.privateRepo,
  });

  registerAutoUpdaterEvents();
  autoUpdateConfigured = true;

  autoUpdater
    .checkForUpdates()
    .catch((error) => console.error('[auto-updater] Initial check failed', error));
};

const createWindow = () => {
  const iconPath = path.join(__dirname, 'epta_icon_qa.ico');

  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    minWidth: 720,
    minHeight: 1280,
    backgroundColor: '#f3f3f3',
    show: false,
    kiosk: false,
    fullscreen: true,
    autoHideMenuBar: true,
    fullscreenable: true,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents
    .setVisualZoomLevelLimits(1, 1)
    .catch((error) => console.warn('[window] Unable to set visual zoom level limits', error));

  try {
    mainWindow.webContents.setLayoutZoomLevelLimits(0, 0);
  } catch (error) {
    console.warn('[window] Unable to set layout zoom level limits', error);
  }

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
