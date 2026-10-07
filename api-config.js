(() => {
  const config = window.SUPERIOR_TOUCH_CONFIG || {};
  const isLocalFrontend = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (isLocalFrontend || typeof config.apiBaseUrl !== 'string') {
    config.apiBaseUrl = 'https://d1ctfj1nygmfqe.cloudfront.net/api';
  }

  console.log('api-config.js', 'config.apiBaseUrl', config.apiBaseUrl);

  window.SUPERIOR_TOUCH_CONFIG = config;
})();