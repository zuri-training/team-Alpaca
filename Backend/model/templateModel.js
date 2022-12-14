// The Template model must be used in conjuction with the library page.
// The library page should load all the templates from the database and
// the description of each template must describe what it does.
// it is accessed as 'template.description', the image is extracted as
// 'template.image' and decode it from base64 byte string. 
// the id of the template must be kept track for updating the views and
// likes from the users.


const {
    timeStamp
} = require('console');
const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        requred: true
    },
    views: {
        type: Number
    },
    likes: {
        type: Number
    }
}, {
    timeStamp: true
});

module.exports = mongoose.model('templateModel', TemplateSchema);