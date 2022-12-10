const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
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
  { timestamps: true }
);

const taskModel = model("comments", commentSchema);

module.exports = taskModel;
