const express = require('express');
const router = express.Router();


//Accéder à la page de Connexion
router.get('/login', (req, res) => {
    res.render('index');
});

//Accéder à la page d'inscription
router.get('/inscription', (req, res) => {
    res.render('index');
});

//Créer un utilisateur
router.post('/', (req, res) => {
    res.render('index');
});

//Modifier un utilisateur
router.put('/:id', (req, res) => {
    res.render('index');
});

//Accéder à ma page de profil
router.get('/monCompte', (req, res) => {
    res.render('index');
});

//Supprimer un utilisateur
router.delete('/:id', (req, res) => {
    res.render('index');
});

module.exports = router;