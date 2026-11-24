const express = require('express');
const pessoas = require('./pessoasRoutes.js');

const acesso = app => {
  app.use(express.json(), pessoas);
};

module.exports = acesso;