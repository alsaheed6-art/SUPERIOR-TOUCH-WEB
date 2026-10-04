(() => {
  const config = window.SUPERIOR_TOUCH_CONFIG || {};
  const isLocalFrontend = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (typeof config.apiBaseUrl !== 'string') {
    config.apiBaseUrl = isLocalFrontend ? 'http://localhost:3001/api' : 'http://superior-touch-alb-1110599205.us-east-2.elb.amazonaws.com/api';
  }

  console.log('api-config.js', 'config.apiBaseUrl', config.apiBaseUrl);

  window.SUPERIOR_TOUCH_CONFIG = config;
})();