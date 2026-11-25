const Controllers = require('./BaseController.js');
const CategoriaService = require('../services/CategoriaServices.js');

const categoriaServices = new CategoriaService();

class CategoriaController extends Controllers {
  constructor() {
    super(categoriaServices);
  }
}

module.exports = CategoriaController;