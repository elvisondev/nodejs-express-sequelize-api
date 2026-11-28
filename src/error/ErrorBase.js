const { STATUS } = require('../utils/http.js');

class ErrorBase extends Error {
  constructor(
    message = 'Erro interno do servidor',
    status = STATUS.INTERNAL_SERVER_ERROR
  ) {
    super(message);

    this.status = status;
  }
  sendResponse(res) {
    res.status(this.status).json({
      message: this.message,
      status: this.status
    });
  }
}

module.exports = ErrorBase;
