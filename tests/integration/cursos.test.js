const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe
} = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/app.js');
const dataSource = require('../../src/database/models');
const { STATUS } = require('../../src/utils/http.js');

describe('GET /cursos - Consulta por intervalo de datas', () => {
  beforeAll(async () => {
    await dataSource.sequelize.sync({ force: true });

    await dataSource['Curso'].bulkCreate([
      { titulo: 'Curso A', data_inicio: '2026-05-20' },
      { titulo: 'Curso B', data_inicio: '2026-06-15' },
      { titulo: 'Curso C', data_inicio: '2026-07-10' },
      { titulo: 'Curso D', data_inicio: '2026-06-01' },
      { titulo: 'Curso E', data_inicio: '2026-06-30' }
    ]);
  });

  afterAll(async () => {
    await dataSource.sequelize.close();
  });

  test('Deve retornar cursos dentro do intervalo de datas', async () => {
    const response = await request(app).get(
      '/cursos?data_inicial=2026-06-01&data_final=2026-06-30'
    );
    const cursos = response.body.map(curso => curso.titulo);

    expect(response.status).toBe(STATUS.OK);
    expect(response.body).toHaveLength(3);
    expect(cursos).toEqual(
      expect.arrayContaining(['Curso B', 'Curso D', 'Curso E'])
    );
  });

  test('Não deve retornar cursos anteriores à data inicial', async () => {
    const response = await request(app).get('/cursos?data_inicial=2026-06-01');

    const cursos = response.body.map(curso => curso.titulo);

    expect(response.status).toBe(STATUS.OK);
    expect(response.body).toHaveLength(4);
    expect(cursos).toEqual(
      expect.arrayContaining(['Curso B', 'Curso C', 'Curso D', 'Curso E'])
    );
  });

  test('Não deve retornar cursos posteriores à data final', async () => {
    const response = await request(app).get('/cursos?data_final=2026-06-30');

    const cursos = response.body.map(curso => curso.titulo);

    expect(response.status).toBe(STATUS.OK);
    expect(response.body).toHaveLength(4);
    expect(cursos).toEqual(
      expect.arrayContaining(['Curso A', 'Curso B', 'Curso D', 'Curso E'])
    );
  });

  test('Deve retornar cursos com datas exatamente nos limites do intervalo', async () => {
    const response = await request(app).get(
      '/cursos?data_inicial=2026-06-01&data_final=2026-06-15'
    );

    const cursos = response.body.map(curso => curso.titulo);

    expect(response.status).toBe(STATUS.OK);
    expect(response.body).toHaveLength(2);
    expect(cursos).toEqual(expect.arrayContaining(['Curso B', 'Curso D']));
  });

  test('Deve retornar 400 ao informar um intervalo de datas invertido', async () => {
    const response = await request(app).get(
      '/cursos?data_inicial=2026-06-30&data_final=2026-06-01'
    );

    expect(response.status).toBe(STATUS.BAD_REQUEST);
  });

  test('Deve retornar 400 ao informar uma data inválida', async () => {
    const response = await request(app).get('/cursos?data_inicial=2026-02-30');

    expect(response.status).toBe(STATUS.BAD_REQUEST);
  });
});
