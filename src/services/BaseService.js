const dataSource = require('../database/models');

class Services {
  constructor(nomeModel) {
    this.model = nomeModel;
  }

  async findAllRecords(where = {}) {
    return dataSource[this.model].findAll({ ...where });
  }

  async getAllRecords(scopeAll) {
    return dataSource[this.model].scope(scopeAll).findAll();
  }

  async findAllByScope(roleScope) {
    return dataSource[this.model].scope(roleScope).findAll();
  }

  async findRecordById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async findAndCountRecords(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async findRecord(where) {
    return dataSource[this.model].findOne({
      where: { ...where }
    });
  }

  async updateRecord(dadosAtualizados, where, transacao) {
    const ListaResgistroAtualizado = await dataSource[this.model].update(
      dadosAtualizados,
      { where: { ...where },
      transaction: transacao }
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
