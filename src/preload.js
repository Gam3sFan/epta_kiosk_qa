const { contextBridge, ipcRenderer } = require('electron');

const AUTO_UPDATE_CHANNEL = 'app:autoUpdate';

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
