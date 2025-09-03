const jwt = require('jsonwebtoken')
const User = require('../model/authModule');    

const RequiredToken = async (req, res, next) => {
    try {
        // const authHeader = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
        // const authHeader = req.cookies.token || req.headers['authorization'];
        const token = req.cookies?.token;

        if (!token && req.headers["authorization"]) {
            token = req.headers["authorization"].split(" ")[1]

            // return res.status(401).json({
            //     status: false,
            //     message: 'Token is required for access this page'
            // })
        }

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token not provided",
            });
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "thisisjwttoken123456")

        // const user = await User.findById(verifiedToken.id)

        // if (!user || user.token !== token) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "Invalid token"
        //     })
        // }
        // req.user = user

        req.user = verifiedToken
        
        console.log("Authenticated User => ", req.user);

        next();

    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: "Token has expired"
            });
        }

        return res.status(400).json({
            status: false,
            message: "Invalid token"
        })
    }

}


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


module.exports = { RequiredToken, AuthCheckToken }