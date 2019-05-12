const express = require('express');
const router = express.Router();

const exerciceController = require('../controllers/exerciceController');

//Consult all exercices
router.get ('/', exerciceController.readAll)

//Consulter the detail of an exercice 
router.get('/:id',exerciceController.read)

//Delete an exercice
router.delete('/:id', exerciceController.delete)

//Update an exercice
router.put('/:id', exerciceController.update)

//Create an exercice
router.post('/', exerciceController.create)

module.exports = router;