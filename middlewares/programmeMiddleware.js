const Utilisateur = require('../models/UtilisateurModel')

//Init jwt
const jwt = require('jsonwebtoken')

exports.isMyProg = (req, res, next) => {
    idUtilisateur = jwt.decode(req.cookies.token).userId
    Utilisateur.checkProgram(idUtilisateur, req.params.id)
    .then(resulat =>{
        if (resulat.rowCount == 0){
            res.sendStatus(401)
        }else{
            next()
        }
    } )
}