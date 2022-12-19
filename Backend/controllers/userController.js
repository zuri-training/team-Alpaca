const User = require('../model/userModel')
passport = require("passport")

//sign up
exports.signUp = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	var fullname = req.body.fullname
	var email = req.body.email
	User.findByUsername(username, function(err, user) {
		if (err) {
			console.log(err)
		} else if (user){
			res.send('username already exist!')
		} else{
			User.register(new User({ username: username, fullname: fullname, email: email}), password,
			function (err, user) {
				if (err) {
					console.log(err);
					return res.render("signup");
				} else{
				passport.authenticate("local")(
					req, res, function () {
					res.render("login");
				})}
			});
		}
	})

};

//login
exports.login = passport.authenticate("local", {
	successRedirect: "/library",
	failureRedirect: "/login"
}), function (req, res) {
}

//logout

exports.logout = (req, res) => {
	req.logout(function(err){
		if (err){
			return next(err)
		}
		res.redirect("/");
	});
}