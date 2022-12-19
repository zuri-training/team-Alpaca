const {Schema, model} =  require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const newSchema = new Schema({
    username: {
       type: String,
       require : true
    },
    fullname: {type: String,
      require: true
   },
   email: {
      type: String,
      require: true
   }
},
{timestamps: true})
newSchema.plugin(passportLocalMongoose);

const todoModel = model('user', newSchema);

module.exports = todoModel