const dataSource = require('../models/index.js');

class Services {
  constructor(nomeModel) {
    this.model = nomeModel;
  }

  async findAllRecords() {
    return dataSource[this.model].findAll();
  }

  async findRecordById(id) {
    console.log(id)
    return dataSource[this.model].findByPk(id);
  }

  async updateRecord(dadosAtualizados, id) {
    const ListaResgistroAtualizado = dataSource[this.model].update(
      dadosAtualizados,
      {
        where: { id: id }
      }
    );
    if (ListaResgistroAtualizado[0] === 0) {
      return false;
    }
    return true;
  }

  async deleteRecord(id) {
    return dataSource[this.model].destroy({
      where: {
        id: id
      }
    });
  }

  async createRecord(newUser) {
    return dataSource[this.model].create(newUser);
  }
}

module.exports = Services;
