const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/app.js');
const dataSource = require('../../src/database/models');
const { STATUS } = require('../../src/utils/http.js');

beforeAll(async () => {
  await dataSource.sequelize.sync();
});

afterAll(async () => {
  await dataSource.sequelize.close();
});

test('Deve atualizar uma pessoa existente e retornar os dados atualizados', async () => {
  const pessoa = await dataSource['Pessoa'].create({
    nome: 'Alex Silva',
    email: 'alex.silva@example.com',
    cpf: '12345678909',
    ativo: true,
    role: 'estudante'
  });

  const response = await request(app).put(`/pessoas/${pessoa.id}`).send({
    nome: 'Alex Sandro'
  });

  const pessoaAtualizada = await request(app).get(`/pessoas/${pessoa.id}`);

  expect(pessoaAtualizada.status).toBe(STATUS.OK);
  expect(response.status).toBe(STATUS.OK);
  expect(pessoaAtualizada.body.nome).toBe('Alex Sandro');
});

test('Deve retornar 404 ao tentar atualizar uma pessoa inexistente', async () => {
  const idInesxistente = 999;

  const response = await request(app).put(`/pessoas/${idInesxistente}`).send({
    nome: 'Alex Sandro Fereira'
  });

  expect(response.status).toBe(STATUS.NOT_FOUND);
});
