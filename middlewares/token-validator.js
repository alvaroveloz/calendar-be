const  { response }  = require('express');
const jwt = require('jsonwebtoken');


const tokenValidator = ( req, res = response, next ) => {

    // x-token headers
    // const token = req.headers('x-token');
    const token = req.headers['x-token'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token doesnt exists on request.'
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const { uid, name } = payload;
        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
         return res.status(401).json({
           ok: false,
           msg: 'Invalid token!!',
         });
    }


    next();
}

module.exports = {
    tokenValidator
}