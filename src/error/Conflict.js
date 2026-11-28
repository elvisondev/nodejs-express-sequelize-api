const ErrorBase = require('./ErrorBase.js')
const { STATUS } = require('../utils/http.js');

class ErrorConflict extends ErrorBase {
  constructor(
    message = 'Conflito com um recurso já existente.'
  ){
    super(message, STATUS.CONFLICT)
  }
}


module.exports = ErrorConflict