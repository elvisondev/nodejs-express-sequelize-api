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

      const listEnrollments = await pessoaServices.getStudentEnrollments(Number(estudanteId));

      res.status(STATUS.OK).json(listEnrollments);
    } catch (error) {
      console.error(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error interno do servidor' });
    }
  }
}

module.exports = PessoaController;
