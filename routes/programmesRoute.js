const express = require('express');
const router = express.Router();

const programController = require('../controllers/programmeControllers');

//Consult all programs
router.get('/mesProgrammes', programController.readAll)

//Consult the detail of a program
router.get('/mesProgrammes/:id', programController.read)

//Update a program
router.put('/mesProgrammes/:id', programController.update)

//Delet a program
router.delete('/mesProgrammes/:id', programController.delete)

//Create a program
router.post('/', programController.create)

module.exports = router;