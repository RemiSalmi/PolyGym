const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

class Utilisateur {
    constructor(id,nom,prenom,mail,mdp,role){
        this.id =id;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
        this.role = role
    }
}

module.exports = Utilisateur

module.exports.findUser = (email) =>{
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
                const utilisateur = new Utilisateur(res.rows[0].id, res.rows[0].nom, res.rows[0].prenom, res.rows[0].email,res.rows[0].mdp, res.rows[0].role)
                resolve(utilisateur)

            }
        })
    })
}
