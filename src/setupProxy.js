const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://me-tube-backend.herokuapp.com/',
      changeOrigin: true,
    })
  );
};