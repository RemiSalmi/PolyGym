//Init jwt
const jwt = require('jsonwebtoken')
const secret = 'qgemunQgqGIqiQGiqgi26gQGI4IgaqiadjoAZidADIzdSIAD33ffé'

exports.isConnected = (req, res, next) => {
    if (req.cookies){
        if(req.cookies){
            jwt.verify(req.cookies.token, secret, (err, token) =>{
                if(err){
                    res.sendStatus(401)
                }else{
                    next()
                }
                
            })
        }else{
            res.sendStatus(401)
        }
    }
}