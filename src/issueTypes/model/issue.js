const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { PRIORITY, STATUS } = require("../../utils/enum");

const issueSchema = new mongoose.Schema({
  issue_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  project_id: {
    type: String,
    ref: "Project",
    required: true,
  },
  issue_type_id: {
    type: String,
    ref: "IssueType",
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: PRIORITY,
    required: true,
  },
  status: {
    type: String,
    enum: STATUS,
    required: true,
  },
  reporter_id: {
    type: String,
    ref: "User",
    required: false,
  },
  assignee_id: {
    type: String,
    ref: "User",
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comments: [{ type: String, ref: "Comment" }],
});

issueSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
