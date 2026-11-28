const ErrorBase = require('./ErrorBase.js')
const { STATUS } = require('../utils/http.js');

class ErrorBadRequest extends ErrorBase {
  constructor(
    message = 'Requisição inválida. Verifique os dados informados.'
  ){
    super(message, STATUS.BAD_REQUEST)
  }
}


module.exports = ErrorBadRequest