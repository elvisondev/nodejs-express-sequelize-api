const { STATUS } = require('../utils/http.js');

class Controllers {
  constructor(entidadeServices) {
    this.entidadeServices = entidadeServices;
  }

  async getAll(req, res) {
    try {
      const listaRegistros = await this.entidadeServices.getAll();
      return res.status(STATUS.OK).json(listaRegistros);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controllers;
