const express = require("express");
const router = express.Router();
const userController = require("../../user/controller/userController");

router.route("/").post(userController.validateUser);

module.exports = router;
