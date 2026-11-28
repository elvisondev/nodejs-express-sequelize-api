const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.getAll(req, res)); // * Listas todos
router.get('/pessoas/roles', (req, res) => pessoaController.getPeopleByRole(req, res)); // * Lista todos por escopo / estudante/ docente

router.get('/pessoas/todos', (req, res) => pessoaController.getAllPeople(req, res)); // * Listas todos / escopo

router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res)); // * Buscar por ID
router.post('/pessoas/', (req, res) => pessoaController.create(req, res)); // * 	Criar
router.put('/pessoas/:id', (req, res) => pessoaController.update(req, res)); // * Atualizar
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.deactivateStudent(req, res)) // * Cancela todas as matriculas de aluno que foi cancelado
router.delete('/pessoas/:id', (req, res) => pessoaController.delete(req, res)); // * Excluir

router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.getEnrollments(req, res)); // * Pega a associação do AS aulasmatriculadas ativas
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.getAllEnrollments(req, res)); // * Assosciaão do AS todasMatriculas canceladas
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.getEnrollmentsStudent(req, res)) // * Pega matriculas confirmadas
router.get('/pessoas/matriculas/lotadas', (req, res) => matriculaController.getAllCourseFull(req, res)) // * Pega cursos lotados
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.getOne(req, res)); // * Busca por apenas matricula e id ou qualquer params
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.create(req, res)); // * 	Criar pessoas e matricualas

router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.update(req, res)); // * Atualiza matriculas
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.delete(req, res)); // * Deleta matriculas




module.exports = router;
