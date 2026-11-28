const ErrorBase = require('../error/ErrorBase.js');

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof ErrorBase) {
    error.sendResponse(res);
  } else {
    console.error(error);
    new ErrorBase().sendResponse(res);
  }
}

module.exports = errorHandler;