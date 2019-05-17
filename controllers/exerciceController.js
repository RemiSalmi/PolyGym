const Exercice = require('../models/ExerciceModel');

//Init jwt
var jwt = require('jsonwebtoken');
const secret = require('../Config/security')

exports.read = (req,res) =>{
    const id = parseInt(req.params.id)
    console.log('TEST',id)
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
    .catch(err => {
        console.error(err)
        res.sendStatus(404)
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


