const isElectron = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator?.userAgent || '';
  return Boolean(window.process?.versions?.electron) || ua.includes('Electron');
};

const showBrowserAlert = () => {
  if (typeof window === 'undefined' || isElectron()) return;
  const key = 'epta-browser-alert-shown';
  try {
    if (window.sessionStorage?.getItem(key)) return;
    window.sessionStorage?.setItem(key, '1');
  } catch (error) {
    // Ignore storage failures and still show the alert once per load.
  }
  window.alert(
    "Questa esperienza e' in sviluppo. La visualizzazione nel browser e' solo un test e non definitiva. Quello che vedi potrebbe cambiare nella versione finale dell'app."
  );
};

showBrowserAlert();
