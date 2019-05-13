const pool = require('../Config/database')

module.exports = class Muscle{
    constructor(id, lib){
        this.id = id;
        this.lib = lib;
    }
}

module.exports.getMuscleById = function (id) {
    pool.query('SELECT * FROM "MUSCLE" WHERE id = $1', [id], (err, res) => {
        console.log(err ? err.stack : res.rows[0].lib)
        
    })

}

module.exports.getAll = function () {
    pool.query('SELECT * FROM "MUSCLE"', (err, res) => {
        console.log(err ? err.stack : res.rows[0].lib)
        
    })

}