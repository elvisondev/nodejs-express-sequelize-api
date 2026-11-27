'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // * hasMany uma categoria tem vários cursos
      Categoria.hasMany(models.Curso, {
        foreignKey: 'categoria_id'
      });
    }
  }
  Categoria.init(
    {
      titulo: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'Categorias',
      paranoid: true
    }
  );
  return Categoria;
};
