const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/Auth')
const progCheck = require('../middlewares/programmeMiddleware')

const programController = require('../controllers/programmeControllers');

//Consult all our own programs
router.get('/mesProgrammes',Auth.isConnected, programController.readAll)

//Consult the detail of a program
router.get('/mesProgrammes/:id',Auth.isConnected, progCheck.isMyProg , programController.read)

//Update a program
router.put('/mesProgrammes/:id',Auth.isConnected, programController.update)

//Delet a program
router.delete('/mesProgrammes/:id',Auth.isConnected, programController.delete)

//Create a program
router.post('/',Auth.isConnected, programController.create)

module.exports = router;