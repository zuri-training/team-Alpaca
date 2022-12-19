const express = require("express");
const {
    json
} = require("express");
const passport = require("passport")
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const LocalStrategy = require("passport-local").Strategy

//import express session
const session = require("express-session");

const connect = require("./Config/database");
const commentRoute = require("./Routes/commentRoute");

const templateRoute = require("./Routes/templateRoutes");
const passwordResetRouter = require("./Routes/passwordResetRoute");
const routes = require('./Routes/userRoute');
const User = require("./model/userModel");

connect();

const PORT = process.env.PORT || 3100;

const app = express();
app.use(morgan('dev'))
app.use(json());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

app.use("/comments", commentRoute);

app.use("/templates", templateRoute);

app.use("/reset", passwordResetRouter);
app.use("/reset-pass", passwordResetRouter);

//parse url encoded bodies
app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

//register session in express
app.use(
    session({
        secret: "PasswordResetNodeJs",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Showing secret page
app.get("/login", isLoggedIn, function (req, res) {
	res.render("login");
});

// Showing register form
app.get("/signup", function (req, res) {
	res.render("signup");
});


app.get("/login", function (req, res) {
	res.render("login");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

app.get("/", (req, res) => {
    res.send("Mongo server on DB");
});

app.use('/', routes)

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
