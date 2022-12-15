const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {loginUser, registerUser, verifyAccount, getUser, forgotPassword } = require('../controller/userController');
const {authenticate} = require('../middlewares/userAuth')

// Register Users
router.post('/register', [
    check("fullname", "Your fullname must be 3+ characters long").exists().isLength({ min: 3}),
    check("username", "Your username must be 3+ characters long").exists().isLength({ min: 3}),
    check("email", "Please enter a valid email address").exists().isEmail(),
    check("password", "Password required and must be a minimum of 8 characters").exists().isLength({ min : 8 })
], registerUser);


// Login User Route
router.post('/login', [
        check("email", "Please enter a valid email address").isEmail(),
        check("password", "please enter a valid password").exists()
    ], loginUser);

router.get('/register/:code', verifyAccount);
// router.get('/me', getAllUsers);
router.get('/me', authenticate , getUser)


module.exports = router;
