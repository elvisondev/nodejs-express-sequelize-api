const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const pessoaControllers = new PessoaController()

const router = Router();

router.get('/pessoas', (req, res) => pessoaControllers.pegaTodos(req, res))

module.exports = router;