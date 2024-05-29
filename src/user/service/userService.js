const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const getAllUsers = async () => {
  return await User.find({}, { password: 0 });
};

const createUser = async (userData) => {
  const user = new User(userData);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  try {
    await user.save();
    return { detail: "User sucessfully saved" };
  } catch (error) {
    throw error;
  }
};

const updateUserStatus = (req, res) => {};

const updateUserPassword = (req, res) => {};

const getUser = async (id) => {
  const user = await User.findOne({ user_id: id }).select("-password").exec();

  if (!user) {
    throw new Error(`User not found`);
  }

  return user;
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    },
    "jwt",
    { expiresIn: "30000s" },
    { algorithm: "HS256" }
  );

  return { token: accessToken };
};

const deleteUser = (req, res) => {};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUserStatus,
  updateUserPassword,
  validateUser,
};
