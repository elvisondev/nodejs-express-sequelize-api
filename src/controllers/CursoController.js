const Controllers = require('./BaseController.js');
const CursoService = require('../services/CursoServices.js');
const { STATUS } = require('../utils/http.js');
const { Op } = require('sequelize');
const ErrorBadRequest = require('../error/BadRequest.js');
const validaData = require('../utils/validarData.js');

const cursoServices = new CursoService();

class CursoController extends Controllers {
  constructor() {
    super(cursoServices);
  }

  async getCourse(req, res, next) {
    const { data_inicial, data_final } = req.query;
    const where = {};


    if (data_inicial !== undefined && !validaData(data_inicial) || data_final !== undefined && !validaData(data_final)) {
      return next(
        new ErrorBadRequest(
          'Data inválida. Utilize o formato YYYY-MM-DD e informe uma data existente.'
        )
      );
    }

    if (data_inicial && data_final && data_inicial > data_final) {
      return next(
        new ErrorBadRequest(
          'A data inicial não pode ser maior que a data final.'
        )
      );
    }

    // * Se os params existirem criar uma prop {}
    data_inicial || data_final ? (where.data_inicio = {}) : null;

    // * Se data inicial existir add prop gte com o valor
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;

    // * Se existir da final idem
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const getCursos = await cursoServices.findAllRecords({ where });
      res.status(STATUS.OK).json(getCursos);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CursoController;
