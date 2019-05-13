const Utilisateur = require('../models/UtilisateurModel');

//Init bcrypt
const bcrypt = require('bcrypt');

//Init jwt
var jwt = require('jsonwebtoken');
const secret = proces.env.secret

exports.create = (req, res) => {

}

exports.read = (req, res) => {
    const tokenInfo = jwt.decode(req.cookies.token)
    Utilisateur.getUserById(tokenInfo.userId)
    .then(utilisateur => {
        res.render('profile', {title: 'Mon profil', utilisateur})
    })
}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.connect = (req, res) => {
    Utilisateur.findUser(req.body.inputEmail)
        .then(resultat => {
            if (resultat.rowCount == 1) {
                if (bcrypt.compareSync(req.body.inputMdp, resultat.rows[0].mdp)) {
                    const myToken = jwt.sign({userId : resultat.rows[0].id, role : resultat.rows[0].role }, secret)
                    res.cookie('token', myToken, {maxAge: 10800000});
                    res.redirect('/')
                } else {
                    res.render('connexion', { title: 'Connexion', error: 'Identifiants invalides' })
                }
            } else {
                res.render('connexion', { title: 'Connexion', error: 'Identifiants invalides' })
            }
        })
}

exports.disconnect = (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}