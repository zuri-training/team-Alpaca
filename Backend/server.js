const express = require("express");
const { json } = require("express");
const cors = require("cors");

//import express session
const session = require("express-session");

const connect = require("./config/database");
const commentRoute = require("./routes/commentRoute");

const likeRoute = require("./routes/likeRoutes");
const passwordResetRouter = require("./Routes/passwordResetRoute");

connect();

const PORT = process.env.PORT || 3100;

const app = express();
// app.use(cors);
app.use(json());
app.use("/comments", commentRoute);

app.use("/like", likeRoute);

app.use("/reset", passwordResetRouter);
app.use("/reset-pass", passwordResetRouter);

//parse url encoded bodies
app.use(express.urlencoded({ extended: true }));
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
