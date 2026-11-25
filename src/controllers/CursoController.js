const Controllers = require('./BaseController.js');
const CursoService = require('../services/CursoServices.js');

const cursoServices = new CursoService();

class CursoController extends Controllers {
  constructor() {
    super(cursoServices);
  }
}

module.exports = CursoController;