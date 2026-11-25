const Services = require('./BaseService.js');

class PessoaService extends Services {
  constructor() {
    super('Pessoa');
  }

  async getStudentEnrollments(id) {
    const student = await super.findRecordById(id);


    const listEnrollments = await student.getAulasMatriculadas();
    return listEnrollments;
  }
}

module.exports = PessoaService;
