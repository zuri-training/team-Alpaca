const User = require('../model/userModel')
const crypto = require('crypto');
const { validateResult } = require("express-validator");
const { generateToken } = require("../middlewares/userAuth")
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/sendMail');

/**
 * @desc Register User 
 * @route POST
 * @route /api/user/register
 * @access Public
 */
const registerUser = asyncHandler( async (req, res) => {
    // validate request --- express-validator
    const validateError = validateResult(req);
    if(!validateError.isEmpty()) {
        res.status(400)
        throw new Error(validateError.array()[0].msg)
            
        }
    try{

        const {fullname, username, email, password} = req.body
		console.log(req.body)
        
        const verifyToken = uuidv4();

        const userExist = await User.findOne({ email })
        if (userExist) {
			res.status(403);
			throw new Error('User already Exists');
		}
        const user = await User.create({
			fullname,
			username,
			email,
			password,
			verificationCode: verifyToken,
		});

		if (user) {
			const text = `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Kindly check your mail to verify your email address to complete the signup</p>
        <a href='http://localhost:5000/api/user/register/${user.verificationCode}'> Click here</a>
        </div>`;

			await sendEmail({
				email: user.email,
				subject: 'Email Verification',
				message: text,
			});

			res.status(201).json({
                success: true,
				message: 'Your account has been created successfully! Please check your mail',
                user: user
			});
		}
	} catch (error) {
		res.status(404);
		throw new Error(error.message);
	}
});


const verifyAccount = asyncHandler(async (req, res) => {
	try {
		const code = req.params.code;
		// compare the confimation code

		const verifyUser = await User.findOne({ verificationCode:code });

		if (!verifyUser) {
			res.status(404);
			throw new Error('User not found');
		} else {
			verifyUser.isVerified = true;
			await verifyUser.save();

			res.status(200).json({
                success: true,
				message: 'Verification Successful. You can login now',
				//isVerified: verifyUser.isVerified,
                user: verifyUser
			});
		}
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
		
	}
});
const try1 = asyncHandler(async (req, res) => {
	const id = await req.params.id;
	res.status(201).json({
		id
	})

})

/**
 * @desc Login a user
 * @route POST
 * @route /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {

    const validationError = validateResult(req);
    if (!validationError.isEmpty()) {
        res.status(400)
        throw new Error(validationError.array()[0].msg)
        
    }
    const { email, password } = req.body;

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		res.status(401);
		throw new Error('Invalid Credentials');
	}

	// check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		res.status(401);
		throw new Error('Invalid Credentials');
	}

	if (user.isVerified === false) {
		res.status(401);
		throw new Error(
			'Your Account is not Verified. Please Verifiy Your Account'
		);
	}
	
	res.status(200).json({
		success: true,
		message: 'Logged in successfully',
		access_token: generateToken(user.id),
        user: user
	});
});


/**
 * @desc Get user profile
 * @route POST
 * @route /api/user/me
 * @access Private/User
 */
const getUser = asyncHandler(async (req, res) => {

    try {
        const user = await User.findById(req.user.id);

        if(!user){
            res.status(404)
            throw new Error('User not found')
        }
        res.status(200).json({
            success: true,
            user: user,
        }); 
        
    } catch(err){
        res.status(500)
        throw new Error(err.message)
    }
});


/**
 * @desc Forgot Password
 * @route POST
 * @route /api/user/forgotpassword
 * @access Public
 */


const forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error('There is no user with that email');
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// create message to pass
	const text = `<h1>Password Reset Link</h1>
        <h2>Hello ${user.firstName}</h2>
        <p>You are receiving this email because you (or someone else) has
         requested the reset of a password. If you think this was done by mistake, ignore the mail or reset your password</p>
           <a href='http://localhost:5000/api/user/resetpassword/${resetToken}'> Click here to reset your password</a>
        </div>`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message: text,
		});

		res.status(200).json({
			success: true,
			message: 'Email sent',
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(500);
		throw new Error('Email could not be sent');
	}
});

module.exports = {
    registerUser,
    verifyAccount,
    loginUser,
    getUser,
    forgotPassword
}
