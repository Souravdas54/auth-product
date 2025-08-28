const jwt = require('jsonwebtoken')


const AuthCheckToken = async (req, res, next) => {

    const token = req?.body?.token || req?.query?.token || req?.headers['x-access-token'] || req?.headers['authorization'];

    if (!token) {
        return res.status(400).json({
            status: false,
            message: 'Token is required for access this page'
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "thisisjwttoken123456")
        req.user = verifiedToken
        console.log(req.user);

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: false,
            message: "Invalid token"
        })
    }

    return next();
}


module.exports = AuthCheckToken