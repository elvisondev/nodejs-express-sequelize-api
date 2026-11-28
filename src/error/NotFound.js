const ErrorBase = require('./ErrorBase.js');
const { STATUS } = require('../utils/http.js');

class ErrorNotFound extends ErrorBase {
  constructor(message = 'Recurso não encontrado.') {
    super(message, STATUS.NOT_FOUND);
  }
}

module.exports = ErrorNotFound;
