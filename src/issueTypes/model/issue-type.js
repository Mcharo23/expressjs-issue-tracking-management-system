const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const issueTypeSchema = new mongoose.Schema({
  issue_type_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
});

const IssueType = mongoose.model("IssueType", issueTypeSchema);

module.exports = IssueType;
