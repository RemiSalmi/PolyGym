const express = require('express');
const router = express.Router();

const userController = require('../controllers/utilisateurController');
const Auth = require('../middlewares/Auth')

//Init bp
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false})

//Get the login page
router.get('/login', (req, res) => {
    res.render('connexion', {title: 'Connexion'});
});

//Get the logout page
router.get('/logout', (req, res) => {
    res.render('deconnexion', {title: 'Déconnexion'});
});

//Disconnect
router.post('/logout', userController.disconnect)

//Connect
router.post('/login',urlencodedParser, userController.connect);

//Get the register page
router.get('/inscription', (req, res) => {
    res.render('inscription', {title : 'Inscription'});
});

//Create an user
router.post('/', urlencodedParser, userController.create)

//Update an user
router.put('/:id', userController.update)

//Get the user's page
router.get('/monCompte', Auth.isConnected, userController.read)

//Delete an user
router.delete('/:idUser',Auth.isConnected,Auth.itsMe, userController.delete)

module.exports = router;