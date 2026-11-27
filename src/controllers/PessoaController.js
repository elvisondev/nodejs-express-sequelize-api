const Controllers = require('./BaseController.js');
const PessoaService = require('../services/PessoaServices.js');
const console = require('console');
const { STATUS } = require('../utils/http.js');

const pessoaServices = new PessoaService();

class PessoaController extends Controllers {
  constructor() {
    super(pessoaServices);
  }

  async getEnrollments(req, res) {
    const { estudanteId } = req.params;

    try {
      const listEnrollments = await pessoaServices.getStudentEnrollments(
        Number(estudanteId)
      );
      if (!listEnrollments) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: 'Estundante não encontrado na base de dados' });
      }
      return res.status(STATUS.OK).json(listEnrollments);
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error interno do servidor' });
    }
  }

  async getAllPeople(req, res) {
    try {
      const listPerson = await pessoaServices.getAllRecordsScope();
      res.status(STATUS.OK).json(listPerson);
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error interno do servidor' });
    }
  }

  async getPeopleByRole(req, res) {
    const byRole = req.query.role;

    const rolesPermision = ['docente', 'estudante']

    try {
     if (!rolesPermision.includes(byRole)) {
       return res.status(STATUS.BAD_REQUEST).json({message: 'Cargo não encontrado'})
      }
      const role = await pessoaServices.findAllByRole(byRole);
      res.status(STATUS.OK).json(role);
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error interno do servidor' });
    }
  }
}

module.exports = PessoaController;
