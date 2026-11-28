const Services = require('./BaseService.js');
const dataSource = require('../database/models');

class PessoaService extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async getStudentEnrollments(id) {
    const student = await super.findRecordById(id);

    if (student) {
      const listEnrollments = await student.getAulasMatriculadas();
      return listEnrollments;
    }
  }

  async getAllStudentEnrollments(id) {
    const studentAll = await super.findRecordById(id);

    if (studentAll) {
      const listAllEnrollments = await studentAll.getTodasMatriculas();
      return listAllEnrollments;
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

  async cancelStudentAndEnrollments(estudante_id) {
    return dataSource.sequelize.transaction(async transacao => {
      await super.updateRecord({ ativo: false }, { id: estudante_id }, transacao);
      await this.matriculaServices.updateRecord(
        { status: 'cancelado' },
        { estudante_id: estudante_id },
        transacao
      );
    });
  }
}

module.exports = PessoaService;
