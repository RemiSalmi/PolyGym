exports.isCorrectEx = (req, res, next) => {
    if (isNaN(req.params.id) == true){
        res.sendStatus(404)
    }else{
        next()
    }
}