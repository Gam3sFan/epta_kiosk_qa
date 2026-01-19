const { contextBridge, ipcRenderer } = require('electron');

const AUTO_UPDATE_CHANNEL = 'app:autoUpdate';
const UPDATER_STATUS_CHANNEL = 'updater:status';

contextBridge.exposeInMainWorld('eptaUpdater', {
  checkForUpdates: () => ipcRenderer.invoke('updater:check'),
  getCurrentVersion: () => ipcRenderer.invoke('updater:get-version'),
  cancelInstall: () => ipcRenderer.invoke('updater:cancel-install'),
  onStatus: (callback) => {
    if (typeof callback !== 'function') {
      return () => {};
    }

    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on(UPDATER_STATUS_CHANNEL, listener);

    return () => {
      ipcRenderer.removeListener(UPDATER_STATUS_CHANNEL, listener);
    };
  },
});

contextBridge.exposeInMainWorld('kioskBridge', {
  getVersion: async () => ipcRenderer.invoke('app:getVersion'),
  checkForUpdates: async () => ipcRenderer.invoke('updates:check'),
  installUpdate: async () => ipcRenderer.invoke('updates:install'),
  analytics: {
    recordSession: async (payload) => ipcRenderer.invoke('analytics:recordSession', payload),
    getStats: async () => ipcRenderer.invoke('analytics:getStats'),
    reset: async () => ipcRenderer.invoke('analytics:reset'),
  },
  onAutoUpdateEvent: (callback) => {
    if (typeof callback !== 'function') {
      return () => {};
    }

    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on(AUTO_UPDATE_CHANNEL, listener);

    return () => {
      ipcRenderer.removeListener(AUTO_UPDATE_CHANNEL, listener);
    };
  },
});
