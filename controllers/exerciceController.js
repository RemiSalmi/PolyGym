const Exercice = require('../models/ExerciceModel');
const Equipement = require('../models/EquipementModel');
const Muscle = require('../models/MuscleModel');

exports.getEquipementById = (req,res) =>{
    const id = parseInt(req.params.id)
    Equipement.findEquipementById(id)
    res.redirect('/')
}

exports.getAllEquipement = (req,res) =>{
    Equipement.getAllBis()
    .then((tabEquip) => {
        console.table(tabEquip)
        res.redirect('/')
    })
    .catch((error) =>{
        console.log(error)
        res.redirect('/')
    }) 
}

exports.getMuscleById = (req,res) =>{
    const id = parseInt(req.params.id)
    Muscle.findMuscleById(id)
    res.redirect('/')
}


