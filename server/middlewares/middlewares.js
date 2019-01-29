var jwt = require(`jsonwebtoken`)

module.exports = {
    auth: function (req, res, next) {
        console.log(req.headers.token);
        
        if (req.headers.token == undefined) {
            res.status(403).json({msg: `please provide jwt token`})
        } else {
            jwt.verify(req.headers.token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    res.status(403).json({msg: `jwt malformed`, err: err})
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        }
    }
};
