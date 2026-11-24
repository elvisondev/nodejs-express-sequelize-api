const dataSource = require('../models');

class Services {
  constructor(nomeModel) {
    this.model = nomeModel;
  }

  async getAll() {
    return dataSource[this.model].findAll();
  }
}

module.exports = Services;
