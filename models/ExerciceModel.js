const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

class Exercice {
    constructor(id, difficulte, lib, img1, img2, img3) {
        this.id = id;
        this.difficulte = difficulte;
        this.lib = lib;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
    }

    getMuscles() {
        return new Promise(function (resolve, reject) {
            console.log('THIS', this)
            pool.query('SELECT lib from "TRAVAILLER" t JOIN "MUSCLE" m on t."idMuscle" = m.id WHERE "idEx" = $1', [this.id], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        })

    }
}

module.exports = Exercice

module.exports.getAll = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM "EXERCICE"', (err, res) => {
            if (err) {
                reject(err)
            } else {
                let tabEx = res.rows.map(ex => new Exercice(ex.id,ex.difficulte,ex.lib,ex.img1,ex.img2,ex.img3))
                resolve(tabEx)
            }
        })
    })
}

module.exports.getExerciceById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM "EXERCICE" WHERE id = $1', [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                const exercice = new Exercice(res.rows[0].id,res.rows[0].difficulte,res.rows[0].lib,res.rows[0].img1,res.rows[0].img2,res.rows[0].img3,res.rows[0].role)
                resolve(exercice)
            }
        })
    })
}