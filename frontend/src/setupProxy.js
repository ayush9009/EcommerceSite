const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.174.1:4000',
      changeOrigin: true,
    })
  );
};
// http://localhost:6000
// http://192.168.174.1:4000