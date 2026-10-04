(() => {
  const config = window.SUPERIOR_TOUCH_CONFIG || {};
  const isLocalFrontend = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (typeof config.apiBaseUrl !== 'string') {
    config.apiBaseUrl = isLocalFrontend ? 'http://localhost:3001/api' : '';
  }

  window.SUPERIOR_TOUCH_CONFIG = config;
})();