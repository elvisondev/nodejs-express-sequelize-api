const express = require('express');
const pessoas = require('./pessoasRoutes.js');
const categorias = require('./categoriaRoutes.js');
const cursos = require('./cursoRoutes.js');

const acesso = app => {
  app.use(express.json(), pessoas, categorias, cursos);
};

module.exports = acesso;
