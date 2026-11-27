const dataSource = require('../database/models');

class Services {
  constructor(nomeModel) {
    this.model = nomeModel;
  }

  async findAllRecords() {
    return dataSource[this.model].findAll();
  }

  async getAllRecords(scopeAll) {
    return dataSource[this.model].scope(scopeAll).findAll();
  }

  async findAllByScope(roleScope) {
    return dataSource[this.model].scope(roleScope).findAll();
  }

  async findRecordById(id) {
    console.log(id);
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
