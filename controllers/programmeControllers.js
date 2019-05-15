const Programme = require('../models/ProgrammeModel');

//Init jwt
var jwt = require('jsonwebtoken');

exports.create = (req,res) =>{
    const nomProg = req.body.InputNomProg
    const descProg = req.body.inputDescProg
    Programme.create(nomProg,descProg)
    .then(() => {
        const tokenInfo = jwt.decode(req.cookies.token)
        Programme.linktoUser(tokenInfo.userId)
        .then(() => {
            res.redirect('/programmes/mesProgrammes')
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.read = (req,res) =>{
    const idProg = parseInt(req.params.idProg)
    Programme.getExercicesByProg(idProg)
    .then(exs => {
        res.render('programme', {title: 'Programme',exs, idProg})
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
    const idProg = req.params.idProg
    const nbRep = req.body.inputNbRep
    const nbSerie = req.body.inputNbSerie
    const idEx = req.body.idEx

    Programme.update(idProg,nbRep,nbSerie,idEx)
    .then(() =>{
        res.sendStatus(200)
    })
    .catch(err =>{
        console.error(err)
        res.status(401).send({error : 'Une erreure s\'est produite lors de la modification'})
    })
}

exports.delete = (req,res) =>{
    const idProg = req.params.idProg
    Programme.delete(idProg)
    .then(() =>{
        res.sendStatus(200)
    })
    .catch(err =>{
        console.error(err)
        res.status(401).send({error : 'Une erreure s\'est produite lors de la supression'})
    })
}

exports.deleteEx = (req,res) =>{
    const idProg = req.params.idProg
    const idEx = req.params.idEx
    Programme.deleteExFromProg(idProg, idEx)
    .then(() =>{
        res.sendStatus(200)
    })
    .catch(err =>{
        console.error(err)
        res.sendStatus(401)
    })
}

exports.getCreatePage = (req, res) =>{
    res.render('creerProg', {title: 'Créer un programme'})
}

exports.getMyProgs = (req, res) =>{
    const idUser = parseInt(req.params.idUser)

    Programme.getAllByUser(idUser)
    .then(tabProg =>{
        res.json(tabProg)
    })
    .catch(err =>{
        console.error(err)
    })
}

exports.addExercice = (req, res) =>{
    const idProg = req.body.inputIdProg
    const idEx = req.body.idEx
    const nbSerie = req.body.inputNbSerie
    const nbRep = req.body.inputNbRep

    Programme.addExercice(idProg,idEx,nbRep,nbSerie)
    .then(() =>{
        res.status(200).send({success: 'Exercice ajouté avec succès'})
    })
    .catch(err => {
        res.status(401).send({error: 'Une erreur s\'est produite , vérifiez de ne pas déjà avoir cet exercice dans ce programme'})
    })
}

