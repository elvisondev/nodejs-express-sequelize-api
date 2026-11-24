const Controllers = require('./Controllers.js');
const PessoaService = require('../services/PessoaServices.js');

const pessoaServices = new PessoaService();

class PessoaController extends Controllers {
  constructor() {
    super(pessoaServices);
  }
}

module.exports = PessoaController;
