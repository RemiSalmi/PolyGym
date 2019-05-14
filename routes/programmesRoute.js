const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/Auth')
const progCheck = require('../middlewares/programmeMiddleware')

//Init bp
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true})

const programController = require('../controllers/programmeControllers');

//Consult all our own programs
router.get('/mesProgrammes',Auth.isConnected, programController.readAll)

//Get the page "create program"
router.get('/mesProgrammes/creer',Auth.isConnected,programController.getCreatePage)

//Consult the detail of one of our programs
router.get('/mesProgrammes/:idProg',Auth.isConnected, progCheck.isMyProg , programController.read)

//Update one of our programs
router.put('/mesProgrammes/:id',Auth.isConnected, programController.update)

//Delete one of our programs
router.delete('/mesProgrammes/:id',Auth.isConnected, programController.delete)

//Create a personal program
router.post('/mesProgrammes',urlencodedParser,Auth.isConnected, programController.create)

//Get user's programs list
router.get('/utilisateurs/:idUser', urlencodedParser,Auth.isConnected, programController.getMyProgs)

//Add exercice to program
router.post('/exercices', urlencodedParser,Auth.isConnected,progCheck.VerifProgOwner, programController.addExercice)

//Delete one exercice of one of our programs
router.delete('/mesProgrammes/:idProg/exercices/:idEx', Auth.isConnected, progCheck.isMyProg, programController.deleteEx)

module.exports = router;