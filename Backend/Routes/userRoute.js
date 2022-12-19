const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const controller = require('../controllers/userController')


// const app = express()

// // Showing home page
// app.get("/", function (req, res) {
// 	res.render("home");
// });

// // Showing secret page
// app.get("/secrete", isLoggedIn, function (req, res) {
// 	res.render("secrete");
// });

// // Showing register form
// app.get("/register", function (req, res) {
// 	res.render("register");
// });

// //Showing registration success page
// app.get("/success", function (req, res) {
// 	res.render("success");
// });


// //Showing login form
// app.get("/login", function (req, res) {
// 	res.render("login");
// });


router.post('/register',[
    check("fullname", "Your fullname must be 3+ characters long").exists().isLength({ min: 3}),
    check("username", "Your username must be 3+ characters long").exists().isLength({ min: 3}),
    check("email", "Please enter a valid email address").exists().isEmail(),
    check("password", "Password required and must be a minimum of 8 characters").exists().isLength({ min : 8 })
], controller.signUp)
router.post('/login', [
    check("username", "Your username must be 3+ characters long").exists().isLength({ min: 3}),
    check("password", "Password required and must be a minimum of 8 characters").exists().isLength({ min : 8 })
], controller.login)
router.get('/logout', controller.logout)


// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated()) return next();
// 	res.redirect("/login");
// }

module.exports = router