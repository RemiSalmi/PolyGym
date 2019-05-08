const express = require('express');
const router = express.Router();

//Consulter la liste des exercices
router.get ('/', (req, res) => {
    res.render('index');
});

//Consulter le detail un exercice 
router.get('/:id', (req, res) => {
    res.render('index');
});

//Supprimer un exercice
router.delete('/:id', (req, res) => {
    res.render('index');
});

//Modifier un exercice
router.put('/:id', (req, res) => {
    res.render('index');
});

//créer un exercice
router.post('/', (req, res) => {
    res.render('index');
});

module.exports = router;