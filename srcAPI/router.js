const express = require('express')

const router = express.Router();

const pontuacaoController = require('./controllers/potuacaoController')

router.get('/', pontuacaoController.getAll);
router.post('/', pontuacaoController.addRecord);
module.exports = router;