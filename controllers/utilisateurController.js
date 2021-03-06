const Utilisateur = require('../models/UtilisateurModel');

//Init bcrypt
const bcrypt = require('bcrypt');

//Init jwt
var jwt = require('jsonwebtoken');
const secret = require('../Config/security')

exports.create = (req, res) => {
    const email = req.body.inputEmail
    const prenom = req.body.inputPrenom
    const nom = req.body.inputNom
    const mdp = req.body.inputMdp
    const mdp2 = req.body.inputMdp2

    if (mdp == mdp2) {
        Utilisateur.verifEmail(email)
            .then(resultat => {
                if (resultat.rowCount == 0) {
                    const encryptedPass = bcrypt.hashSync(mdp, 10)
                    const utilisateur = new Utilisateur(1, nom, prenom, email, encryptedPass, 'Client')
                    Utilisateur.create(utilisateur)
                        .then(() => {
                            res.redirect('/utilisateurs/login')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    res.render('inscription', { title: 'Inscription', error: 'Adresse email déjà utilisée' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        res.render('inscription', { title: 'Inscription', error: 'Les mots de passes ne correspondent pas' })
    }
}

exports.read = (req, res) => {
    const tokenInfo = jwt.decode(req.cookies.token)
    Utilisateur.getUserById(tokenInfo.userId)
        .then(utilisateur => {
            res.render('profile', { title: 'Mon profil', utilisateur })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.update = (req, res) => {
    const idUser = parseInt(req.params.idUser)
    let mdp = req.body.mdp
    mdp = bcrypt.hashSync(mdp, 10)
    Utilisateur.update(mdp, idUser)
        .then(() => {
            res.status(200).send({ success: "Mot de passe modifié avec succès" })
        })
        .catch(err => {
            console.error(err)
            res.status(401).send({ error: "erreur lors du changement de mot de passe" })
        })
}

exports.delete = (req, res) => {
    const idUser = parseInt(req.params.idUser)
    Utilisateur.delete(idUser)
        .then(() => {
            res.clearCookie('token')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(401).send({ error: 'Erreur lors de la supression de l\'utilisateur' })
        })
}

exports.connect = (req, res) => {
    Utilisateur.findUser(req.body.inputEmail)
        .then(resultat => {
            if (resultat.rowCount == 1) {
                if (bcrypt.compareSync(req.body.inputMdp, resultat.rows[0].mdp)) {
                    const myToken = jwt.sign({ userId: resultat.rows[0].id, role: resultat.rows[0].role }, secret)
                    res.cookie('token', myToken, { maxAge: 10800000 });
                    res.redirect('/')
                } else {
                    res.render('connexion', { title: 'Connexion', error: 'Identifiants invalides' })
                }
            } else {
                res.render('connexion', { title: 'Connexion', error: 'Identifiants invalides' })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

exports.disconnect = (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}