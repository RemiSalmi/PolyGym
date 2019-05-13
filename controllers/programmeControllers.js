const Programme = require('../models/ProgrammeModel');

//Init jwt
var jwt = require('jsonwebtoken');

exports.create = (req,res) =>{

}

exports.read = (req,res) =>{
    const id = parseInt(req.params.id)
    Programme.getExercicesByProg(id)
    .then(exs => {
        res.render('programme', {title: 'Programme',exs})
    })
    .catch(err =>{
        console.error(err)
    })

}

exports.readAll = (req,res) =>{
    const tokenInfo = jwt.decode(req.cookies.token)
    Programme.getAllByUser(tokenInfo.userId)
    .then(tabProg =>{
        res.render('mesProgrammes', {title: 'Mes programmes', tabProg})
    })
    .catch(err => {
        console.log(err)
    })
}

exports.update = (req,res) =>{

}

exports.delete = (req,res) =>{

}

