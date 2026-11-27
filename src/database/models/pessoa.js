'use strict';
const validarCpf = require('../../utils/helpperCpf.js');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      // define association here
      // * O FK ou chave estrangeira foreignKey sendo relacionada no banco de ponta a ponta
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // scope: { status: 'matriculado' },
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 150],
            msg: 'O campo nome deve ter no minímo 3 caracteres'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Formato do e-mail inválido'
          }
        }
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfValido: cpf => {
            if (!validarCpf(cpf)) throw new Error('Número de CPF inválido');
          }
        }
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Pessoa',
      tableName: 'pessoas',
      // * Metodo do sequlize onde eu uso o case de SoftDelet
      paranoid: true,
      // * Metodo onde eu retorno na minha consulta apenas ususarios ativos/escopo padrão
      defaultScope: {
        where: {
          ativo: true
        }
      },
      // * Add o scopes para buscarmos todos os registros
      scopes: {
        registros: {
          where: {}
        },
        byRole(role) {
          return {
            where: {
              role: role
            }
          };
        }
      }
    }
  );
  return Pessoa;
};
