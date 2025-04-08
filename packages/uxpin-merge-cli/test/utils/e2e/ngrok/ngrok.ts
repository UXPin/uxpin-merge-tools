// https://github.com/request/request-promise/issues/247
jest.resetModules();
let ngrok;
try {
  ngrok = require('ngrok');
} catch (e) {
  ngrok = {};
}

export { ngrok };
