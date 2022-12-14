const {Schema, model} = require('mongoose')

const userSchema =  Schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        require: true},
    password: {
        type: String,
        require: true
    }
})

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await bcrypt.hash(this.password, 12);
	} catch (err) {
		next(err);
	}
});

// Match user password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
const userModel = model('User', userSchema)
module.exports = userModel
