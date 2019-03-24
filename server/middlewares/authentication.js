
const jwt = require('jsonwebtoken');


// ========================
//  Verify Token
// ========================
let verifyToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
               success: false,
               err: {
                   message: 'Invalid token'
               }
            });
        }

        req.dataUser = decoded.dataUser;

        next();
    });
};


module.exports = {
    verifyToken
};