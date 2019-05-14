const Utilisateur = require('../models/UtilisateurModel')

//Init jwt
const jwt = require('jsonwebtoken')

exports.isMyProg = (req, res, next) => {
    const idUtilisateur = jwt.decode(req.cookies.token).userId
    Utilisateur.checkProgram(idUtilisateur, req.params.idProg)
    .then(resulat =>{
        if (resulat.rowCount == 0){
            res.status(401).send({error:'Ce programme ne vous appartient pas'})
        }else{
            next()
        }
    } )
}

exports.VerifProgOwner = (req, res, next) => {
    const idProg = req.body.inputIdProg
    const idUtilisateur = jwt.decode(req.cookies.token).userId
    console.log(idProg)
    Utilisateur.checkProgram(idUtilisateur, idProg)
    .then(resulat =>{
        if (resulat.rowCount == 0){
            res.status(401).send({error: 'Vous essayez d\'accéder à un programme qui n\'est pas le vôtre'})
        }else{
            next()
        }
    } )

}