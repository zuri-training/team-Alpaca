const express = require("express");
const {
    json
} = require("express");

//import express session
const session = require('express-session')
//load express

const User = require("./model/userModel");

const connect = require("./config/database");
const cors = require('cors');
const commentRoute = require("./routes/commentRoute");
const likeRoute = require("./routes/likeRoutes");


connect();

const app = express();
app.use(cors);
app.use(json());
app.use("/comment", commentRoute);
app.use('/like', likeRoute)

//parse url encoded bodies
app.use(express.urlencoded({ extended: true }))
//register session in express
app.use(session({
    secret: 'PasswordResetNodeJs',
    resave: true,
    saveUninitialized: true
}))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Mongo server on DB");
});

//reset route
app.get('/reset', async (req, res) => {
    try {
        //check for email and hash in query parameter
        if (req.query && req.query.email && req.query.hash) {
            //find user with suh email address
            const user = await User.findOne({ email: req.query.email })
            //check if user object is not empty
            if (user) {
                //now check if hash is valid
                if (new User(user).verifyPasswordResetHash(req.query.hash)) {
                    //save email to session
                    req.session.email = req.query.email;
                    //issue a password reset form
                    return res.sendFile(__dirname + "./Frontend/new_pass")
                } else {
                    return res.status(400).json({
                        message: "You have provided an invalid reset link"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "You have provided an invalid reset link"
                })
            }
        } else {
            //if there are no query parameters, serve the normal request form
            return res.sendFile(__dirname + './Frontend/reset.html')
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//generate reset link
app.post('/reset', async (req, res) => {
    try {
        //find a document with such email address
        const user = await User.findOne({ email: req.body.email })
        //check if user object is not empty
        if (user) {
            //generate hash using the user object
            const hash = new User(user).passwordResetHash()
            //generate a password reset link
            const resetLink = `http://localhost:3000/reset?email=${user.email}&hash=${hash}`
            //remember to send a mail to the user
            return res.status(200).json({
                resetLink
            })
        } else {
            //respond with an invalid email
            return res.status(400).json({
                message: "Email Address does not exist"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//update password
app.post('/reset-pass', async (req, res) => {
    try {
        if(!req.session || !req.session.email) return res.redirect('/login')
            //check if both passwords are equal
            if(req.body.pass !== req.body.conpass)
                return res.status(400).json({
                    message: "Both passwords do not match"
                })
            //update document
            const updatedDoc = await User.findOneAndUpdate({ email: req.session.email }, { password : req.body.pass })
            //password update successful
            if(updatedDoc){
                //remove email from session
                req.session.email = '';
                //return success messa
                return res.status(200).json({
                    message : "Your password has been updated"
                })
            }
            return res.status(200).json({
                message : "Your password was not updated"
            })
            //remember to send a mail to the user
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));