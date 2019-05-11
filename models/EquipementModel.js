const { Pool } = require('pg')
const pool = new Pool()


class Equipement {
    constructor(id, lib) {
        this.id = id;
        this.lib = lib;
    }
}

module.exports = Equipement

module.exports.getEquipementById = (id) => {
    pool.query('SELECT * FROM "EQUIPEMENT" WHERE id = $1', [id], (err, res) => {
        console.log(err ? err.stack : res.rows[0].lib)
        
    })
}

module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM "EQUIPEMENT"', (error, res) => {
            if (error){
                reject (error)
            }else{
                let tabEquip = res.rows.map(item => new Equipement(item.id, item.lib))
                resolve(tabEquip)
            }
        })
    })
}
