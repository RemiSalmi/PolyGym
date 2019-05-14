const pool = require('../Config/database')



class Programme {
    constructor(id, lib, desc) {
        this.id = id;
        this.lib = lib;
        this.desc = desc
    }

}

module.exports = Programme

module.exports.getAllByUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from "UTILISATEUR_PROGRAMME" up JOIN "PROGRAMME" p on up."idProg" = p.id WHERE "idUtilisateur" = $1', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                let tabProg = res.rows.map(prog => new Programme(prog.id, prog.lib, prog.desc))
                resolve(tabProg)
            }
        })
    })
}

module.exports.getExercicesByProg = (idProg) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id,lib,"idEx","nbSerie","nbRep",img1 FROM "COMPOSITION_PROGRAMME" cp JOIN "EXERCICE" e ON cp."idEx" = e.id WHERE "idProg" = $1', [idProg], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows)
            }
        })
    })
}

module.exports.create = (lib, desc) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO "PROGRAMME" (lib,"desc") VALUES ($1,$2)', [lib, desc], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports.linktoUser = (idUser) => {
    return new Promise((resolve, reject) => {
        pool.query('select last_value FROM "PROGRAMME_id_seq"', (err, res) => {
            if (err) {
                reject(err)
            } else {
                var idProg = res.rows[0].last_value
                pool.query('INSERT INTO "UTILISATEUR_PROGRAMME" ("idUtilisateur","idProg") VALUES ($1,$2)', [idUser, idProg], (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            }
        })

    })
}

module.exports.addExercice = (idProg, idEx, nbRep, nbSerie) =>{
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO "COMPOSITION_PROGRAMME" ("idProg","idEx", "nbSerie","nbRep") VALUES ($1,$2,$3,$4)', [idProg, idEx,nbSerie,nbRep], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports.deleteExFromProg = (idProg, idEx) =>{
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM "COMPOSITION_PROGRAMME" WHERE "idProg" = $1 AND "idEx" = $2 ', [idProg, idEx], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}