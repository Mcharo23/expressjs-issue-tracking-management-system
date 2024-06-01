const userService = require("../service/userService");
const ROLES = require("../../utils/uer-role");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createUser = async (req, res) => {
  try {
    const data = req.body;
    data.role = ROLES.DEVELOPER;
    const savedUser = await userService.createUser(data);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const updateUserStatus = (req, res) => {};

const updateUserPassword = (req, res) => {};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ detail: "User not found" });
    } else {
      console.error(error);
      res.status(400).send(error);
    }
  }
};

const validateUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.validateUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ detail: "Invalid credentials" });
    } else if (error.message === "inactive account") {
      res.status(401).json({ detail: "Yout account is inactive" });
    } else if (error.message === "user deleted") {
      res.status(401).json({ detail: "Your account has been frozen" });
    } else {
      console.error(error);
      res.status(400).send(error);
    }
  }
};

const deleteUser = (req, res) => {};

const activateUser = async (req, res) => {
  try {
    const user = await userService.activateUser(req.body.user_id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "not found") {
      res.status(404).json({ detail: "User not found" });
    } else {
      res.status(400).send(error);
    }
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
