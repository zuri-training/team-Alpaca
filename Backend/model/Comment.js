const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
      maxlength: 50,
    },
    priority: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = model("comments", commentSchema);

module.exports = commentModel;
