const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.getAll(req, res)); // * Listas todos
router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res)); // * Buscar por ID
router.post('/pessoas/', (req, res) => pessoaController.create(req, res)); // * 	Criar
router.put('/pessoas/:id', (req, res) => pessoaController.update(req, res)); // * Atualizar
router.delete('/pessoas/:id', (req, res) => pessoaController.delete(req, res)); // * Excluir

router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.getEnrollments(req, res));
router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.create(req, res)); // * 	Criar





module.exports = router;
