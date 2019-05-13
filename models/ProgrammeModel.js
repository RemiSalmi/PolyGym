const pool = require('../Config/database')



class Programme {
    constructor(id, lib, desc){
        this.id = id;
        this.lib = lib;
        this.desc = desc
    }

}

module.exports = Programme

module.exports.getAllByUser = (id) => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT * from "UTILISATEUR_PROGRAMME" up JOIN "PROGRAMME" p on up."idProg" = p.id WHERE "idUtilisateur" = $1',[id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                let tabProg = res.rows.map(prog => new Programme(prog.id,prog.lib,prog.desc))
                resolve(tabProg)
            }
        })
    })
}

module.exports.getExercicesByProg = (idProg) => {
    return new Promise((resolve, reject) =>{
        pool.query('SELECT lib,"idEx","nbSerie","nbRep",img1 FROM "COMPOSITION_PROGRAMME" cp JOIN "EXERCICE" e ON cp."idEx" = e.id WHERE "idProg" = $1',[idProg], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows)
            }
        })
    })
}