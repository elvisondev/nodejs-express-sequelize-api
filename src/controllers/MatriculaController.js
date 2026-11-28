const Controllers = require('./BaseController.js');
const MatriculaService = require('../services/MatriculaServices.js');
const { STATUS } = require('../utils/http.js');
const Sequelize = require('sequelize');

const matriculaServices = new MatriculaService();

class MatriculaController extends Controllers {
  constructor() {
    super(matriculaServices);
  }

  async getEnrollmentsStudent(req, res) {
    const { estudante_id } = req.params;
    try {
      const enrollmentsByStudent =
        await this.entidadeServices.findAndCountRecords({
          where: {
            estudante_id: Number(estudante_id),
            status: 'matriculado'
          },
          limit: 2,
          order: [['id', 'ASC']]
        });
      return res.status(STATUS.OK).json(enrollmentsByStudent);
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }

  async getAllCourseFull(req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.findAndCountRecords({
        where:{
          status: 'matriculado'
        },
        attributes: ['curso_id'],
        group: ['curso_id'],
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
       });
      return res.status(STATUS.OK).json(cursosLotados.count); // * .count so traz os agrupamento
    }catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = MatriculaController;
