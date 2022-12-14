const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
require('dotenv').config()


const authenticate = asyncHandler(async (req, res, next) => {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                 // To get token from headers 
            token = req.headers.authorization.split(' ')[1]

            // to verify obtained token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // to get user from token 
            req.user = await User.findById(decoded.id).select('-password')

            next()

            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error('You are not authorized')
            }
        }

        if(!token) {
            res.status(401)
            throw new Error('No token. Not Authourized')
        }
})

// to generate jwt token
const generateToken = (id) => {
	    return jwt.sign( { id } , process.env.JWT_SECRET_CODE, {
		expiresIn: process.env.JWT_EXPIRE_TIME
	});
};


module.exports = {
    authenticate,
    generateToken
}
