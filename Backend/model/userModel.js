//import mongoose
const mongoose = require('mongoose')
//import crypto
const crypto = require('crypto')

//create schema
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})

//generate password reset hash
userSchema.methods.passwordResetHash = function(){
    //create hash object, then create a sha512 hash of the user's current password 
    //and return hash
    const resetHash = crypto.createHash('sha512').update(this.password).digest('hex')
    return resetHash;
}

//verify password reset hash
userSchema.methods.verifyPasswordResetHash = function(resetHash = undefined){
    //regenerate hash and check if they are equal
    return this.passwordResetHash() === resetHash;
}

//our model
const User = mongoose.model('User', userSchema)
module.exports = User;