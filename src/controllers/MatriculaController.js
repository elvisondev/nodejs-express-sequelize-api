const Controllers = require('./BaseController.js');
const MatriculaService = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaService();

class MatriculaController extends Controllers {
  constructor() {
    super(matriculaServices);
  }
}

module.exports = MatriculaController;