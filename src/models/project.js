const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
