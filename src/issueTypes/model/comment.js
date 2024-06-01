const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  issue_id: {
    type: String,
    ref: "Issue",
    required: true,
  },
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
