const Exercice = require('../models/ExerciceModel');

exports.create = (req,res) =>{

}

exports.read = (req,res) =>{
    const id = parseInt(req.params.id)
    Exercice.getExerciceById(id)
    .then(exercice =>{
        console.log(exercice)
        exercice.getMuscles()
        .then(tabMuscle =>{
            res.render('exercice', {title : `Exercice: ${Exercice.lib} `, Exercice, tabMuscle})
        })
        
    })
}

exports.readAll = (req,res) =>{
    Exercice.getAll()
    .then(tabEx =>{
        res.render('listeExercices', {title : 'Liste des exercice', tabEx})
    })
}

exports.update = (req,res) =>{

}

exports.delete = (req,res) =>{

}


exports.getAllEquipement = (req,res) =>{
    Equipement.getAll()
    .then((tabEquip) => {
        console.table(tabEquip)
        res.send(JSON.stringify(tabEquip))
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


