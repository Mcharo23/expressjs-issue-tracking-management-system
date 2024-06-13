const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DEVELOPER } = require("../../utils/uer-role");

const saltRounds = 10;

const getAllUsers = async () => {
  return await User.find({ role: DEVELOPER }, { password: 0 });
};

const createUser = async (userData) => {
  const user = new User(userData);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.last_name, salt);

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

  if (user.is_deleted) {
    throw new Error("user deleted");
  }

  if (!user.is_active) {
    throw new Error("inactive account");
  }

  const accessToken = jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    },
    "jwt",
    { expiresIn: "6000s" },
    { algorithm: "HS256" }
  );

  return { token: accessToken };
};

const deleteUser = async (user_id) => {
  try {
    const user = await User.findOne({ user_id: user_id }).exec();

    if (!user) {
      throw new Error("not found");
    }
    const message = user.is_deleted
      ? "Successfully deleted"
      : "successfully account restored";

      user.is_deleted = !user.is_deleted;
      await user.save();

      return {detail: message};
  } catch (error) {
    throw new Error(error);
  }
};

const activateUser = async (user_id) => {
  try {
    const user = await User.findOne({ user_id: user_id }).exec();

    const message = user.is_active
      ? "successfully deactivated"
      : "successfully activated";

    if (!user) {
      throw new Error("not found");
    }

    user.is_active = !user.is_active;
    await user.save();

    return { detail: message };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUserStatus,
  updateUserPassword,
  validateUser,
  activateUser,
};
