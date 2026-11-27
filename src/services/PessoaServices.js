const Services = require('./BaseService.js');

class PessoaService extends Services {
  constructor() {
    super('Pessoa');
  }

  async getStudentEnrollments(id) {
    const student = await super.findRecordById(id);

    if (student) {
      const listEnrollments = await student.getAulasMatriculadas();
      return listEnrollments;
    }
  }

  async getAllRecordsScope() {
    const listPerson = await super.getAllRecords('registros');
    return listPerson;
  }

  async findAllByRole(byRole) {
    const role = await super.findAllByScope({ method: ['byRole', byRole] });
    return role;
  }
}

module.exports = PessoaService;
