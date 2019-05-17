const Exercice = require('../models/ExerciceModel');

//Init jwt
var jwt = require('jsonwebtoken');
const secret = require('../Config/security')

exports.create = (req,res) =>{

}

exports.read = (req,res) =>{
    const id = parseInt(req.params.id)
    Exercice.getExerciceById(id)
    .then(exercice =>{
        exercice.getMuscles()
        .then(tabMuscles =>{
            exercice.getEquips()
            .then(tabEquips => {
                let idUser
                if(req.cookies.token){
                    userInfo = jwt.decode(req.cookies.token)
                    idUser = userInfo.userId
                }else{
                    idUser = -1
                }
                res.render('exercice', {title : `Exercice: ${exercice.lib} `, exercice, tabMuscles, tabEquips, idUser})
            })      
        })
        
    })
}

exports.readAll = (req,res) =>{
    Exercice.getAll()
    .then(tabEx =>{
            Promise.all( tabEx.map(ex => ex.getMuscles().then(m => ex["muscles"] = m)))
            .then(() =>{
                res.render('listeExercices', {title : 'Liste des exercices', tabEx,})   
            })    
        
                
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


