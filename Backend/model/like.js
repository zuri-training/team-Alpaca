const {
    Schema,
    model,
    Types
} = require("mongoose");

const likeSchema = new Schema({
    documentationId: {
        type: Types.ObjectId,
        required: true,
        unique: true,
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});

const likeModel = model('likes', likeSchema);