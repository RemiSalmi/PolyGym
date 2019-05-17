const express = require('express');
const router = express.Router();

const exerciceController = require('../controllers/exerciceController');
const routeCheck = require('../middlewares/checkRoute')

//Consult all exercices
router.get ('/', exerciceController.readAll)

//Consulter the detail of an exercice 
router.get('/:id',routeCheck.isCorrectEx,exerciceController.read)

module.exports = router;