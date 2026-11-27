const console = require('console');
const { STATUS } = require('../utils/http.js');

class Controllers {
  constructor(entidadeServices) {
    this.entidadeServices = entidadeServices;
  }

  async getAll(req, res) {
    try {
      const listaRegistros = await this.entidadeServices.findAllRecords();
      return res.status(STATUS.OK).json(listaRegistros);
    } catch (error) {
      console.error(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: 'Erro interno do servidor'})
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const IDbuscado = await this.entidadeServices.findRecordById(Number(id));

      if (!IDbuscado) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: 'Id não encontrado' });
      }
      return res.status(STATUS.OK).json(IDbuscado);
    } catch (error) {
      console.error(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: 'Erro interno do servidor'})
    }
  }

  async create(req, res) {
    const createUser = req.body;

    try {
      const createNewUser = await this.entidadeServices.createRecord(createUser);

      if (!createNewUser) {
        return res
          .status(STATUS.BAD_REQUEST)
          .json({ message: 'Error ao cadastrar usuário' });
      }

      return res
        .status(STATUS.CREATED)
        .json({ message: 'Novo usuário criado com sucesso', data: createNewUser });
    } catch (error) {
      console.error(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const dadosAtualizado = req.body;

    try {

      const foiAtualizado = await this.entidadeServices.updateRecord(
        dadosAtualizado,
        Number(id)
      );

      if (!foiAtualizado) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: `Registro não encontrado para atualização` });
      }
      return res.status(STATUS.OK).json({ message: `Atualizado com sucesso` });
    } catch (error) {
      console.error(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: 'Erro interno do servidor'})
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const deleteUser = await this.entidadeServices.deleteRecord(Number(id));

      if (!deleteUser) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: 'User não encontrado para exclusão' });
      }

      return res
          .status(STATUS.OK)
          .json({ message: 'User deletado com suscesso' });

    } catch (error) {
      console.error(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({message: 'Erro interno do servidor'})
    }
  }
}

module.exports = Controllers;