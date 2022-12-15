const express = require("express");
const {
    json
} = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const morgan = require('morgan');
require('dotenv').config();

//import express session
const session = require("express-session");

const connect = require("./Config/database");
const commentRoute = require("./Routes/commentRoute");

const templateRoute = require("./Routes/templateRoutes");
const passwordResetRouter = require("./Routes/passwordResetRoute");
const routes = require('./Routes/userRoute');

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
app.use('/api/user', routes);
app.use("/comments", commentRoute);

app.use("/templates", templateRoute);

app.use("/reset", passwordResetRouter);
app.use("/reset-pass", passwordResetRouter);

//parse url encoded bodies
app.use(express.urlencoded({
    extended: true
}));

//register session in express
app.use(
    session({
        secret: "PasswordResetNodeJs",
        resave: true,
        saveUninitialized: true,
    })
);

app.get("/", (req, res) => {
    res.send("Mongo server on DB");
});

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
