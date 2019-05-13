const pool = require('../Config/database')

class Utilisateur {
    constructor(id, nom, prenom, mail, mdp, role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
        this.role = role
    }
}

module.exports = Utilisateur

module.exports.findUser = (email) => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM "UTILISATEUR"  WHERE email = $1', [email], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)

            }
        })
    })
}

module.exports.getUserById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM "UTILISATEUR"  WHERE id = $1', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                const utilisateur = new Utilisateur(res.rows[0].id, res.rows[0].nom, res.rows[0].prenom, res.rows[0].email, res.rows[0].mdp, res.rows[0].role)
                resolve(utilisateur)

            }
        })
    })
}

module.exports.create = (utilisateur) => {
    return new Promise(function (resolve, reject) {
        pool.query('INSERT INTO "UTILISATEUR" ("email","nom","prenom","mdp","role") VALUES ($1, $2, $3, $4, $5);', [utilisateur.mail, utilisateur.nom, utilisateur.prenom, utilisateur.mdp, utilisateur.role], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports.verifEmail = (email) => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT id FROM "UTILISATEUR" WHERE email= $1 ', [email], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
