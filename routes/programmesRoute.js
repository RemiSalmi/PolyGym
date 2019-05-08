const express = require('express');
const router = express.Router();

//Afficher la liste de mes programmes
router.get('/mesProgrammes', (req, res) => {
    res.render('index');
});

//Afficher le détail d'un programme
router.get('/mesProgrammes/:id', (req, res) => {
    res.render('index');
});

//Modifier un de mes programmes
router.put('/mesProgrammes/:id', (req, res) => {
    res.render('index');
});

//Supprimer un de mes programmes
router.delete('/mesProgrammes/:id', (req, res) => {
    res.render('index');
});

//Créer un programme
router.post('/', (req, res) => {
    res.render('index');
});

module.exports = router;