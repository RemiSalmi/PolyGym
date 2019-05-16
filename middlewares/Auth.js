//Init jwt
const jwt = require('jsonwebtoken')
const secret = require('../Config/security')

exports.isConnected = (req, res, next) => {
    if (req.cookies) {
        if (req.cookies) {
            jwt.verify(req.cookies.token, secret, (err, token) => {
                if (err) {
                    res.sendStatus(401)
                } else {
                    next()
                }

            })
        } else {
            res.sendStatus(401)
        }
    }
}

exports.itsMe = (req, res, next) => {
    idSend = parseInt(req.params.idUser)
    userInfo = jwt.decode(req.cookies.token)
    idCurrentUser = parseInt(userInfo.userId)    
    if (idSend == idCurrentUser) {
        next()
    } else {
        res.sendStatus(401)
    }
}