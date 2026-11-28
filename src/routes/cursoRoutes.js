const { Router } = require('express');
const CursoController = require('../controllers/CursoController.js');

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res) => cursoController.getCourse(req, res)); // * Listas todos com params ou não
router.get('/cursos/:id', (req, res) => cursoController.getById(req, res)); // * Buscar por ID
router.post('/cursos/', (req, res) => cursoController.create(req, res)); // * 	Criar
router.put('/cursos/:id', (req, res) => cursoController.update(req, res)); // * Atualizar
router.delete('/cursos/:id', (req, res) => cursoController.delete(req, res)); // * Excluir



module.exports = router;
