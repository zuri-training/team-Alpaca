const Comment = require("../model/Comment");

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    let comments = await Comment.find();
    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments yet!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comments found!",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mesage: "Internal Server Error",
      error: error.message,
    });
  }
};

// get single comment
exports.getTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let comment = await Comment.findOne({ _id: id });
    if (!task)
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    res.status(200).json({
      success: true,
      message: "Comment found",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Create comment
exports.createComment = async (req, res) => {
  try {
    let comment = await req.body;
    let created = await Comment.create(comment);
    if (!created)
      return res.status(400).json({
        success: false,
        message: "Comment created failed",
      });
    return res.status(200).json({
      success: true,
      message: "Comment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

// update comment
exports.updateComment = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let comment = await req.body;
    let updated = await comment.findOneAndUpdate(id, comment, { new: true });

    if (!updated)
      return res.status(400).json({
        success: false,
        message: "Comment not updated",
      });
    res.status(201).json({
      success: true,
      message: "Comment updated",
      user: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete comments
exports.deleteComment = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let deleted = await Comment.findOneAndRemove(id);
    if (!deleted)
      return res.status(400).json({
        success: false,
        message: "Comment not deleted",
        error: error.message,
      });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
