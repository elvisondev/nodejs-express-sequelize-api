const Controllers = require('./BaseController.js');
const CursoService = require('../services/CursoServices.js');
const { STATUS } = require('../utils/http.js');
const { where } = require('sequelize');
const { Op } = require('sequelize');

const cursoServices = new CursoService();

class CursoController extends Controllers {
  constructor() {
    super(cursoServices);
  }

  async getCourse(req, res) {
    const {data_inicial, data_final} = req.query

    // * Se os params existirem criar uma prop {}
    data_inicial || data_final ? where.data_inicio = {} : null

    // * Se data inicial existir add prop gte com o valor
     data_inicial ? where.data_inicio[Op.gte] = data_inicial : null

     // * Se existir da final idem
      data_final ? where.data_inicio[Op.lte] = data_final : null

      try {
        const getCursos = await cursoServices.findAllRecords(where)
        res.status(STATUS.OK).json(getCursos)
      } catch (error) {
        console.error(error)
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: 'Error internal de servidor'})
      }
  }
}

module.exports = CursoController;