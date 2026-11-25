const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res) => categoriaController.getAll(req, res)); // * Listas todos
router.get('/categorias/:id', (req, res) => categoriaController.getById(req, res)); // * Buscar por ID
router.post('/categorias/', (req, res) => categoriaController.create(req, res)); // * 	Criar
router.put('/categorias/:id', (req, res) => categoriaController.update(req, res)); // * Atualizar
router.delete('/categorias/:id', (req, res) => categoriaController.delete(req, res)); // * Excluir



module.exports = router;
