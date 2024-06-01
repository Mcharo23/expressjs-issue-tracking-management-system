const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const USER_ROLES = require("../../utils/uer-role");

const userSchema = new mongoose.Schema({
  user_id: { type: String, default: uuidv4, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.DEVELOPER],
    default: USER_ROLES.DEVELOPER,
    required: true,
  },
  is_active: { type: Boolean, default: false, required: true },
  is_deleted: { type: Boolean, default: false, required: true },

  password: { type: String, required: true },
  reported_issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  assigned_issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
