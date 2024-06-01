const express = require("express");
const router = express.Router();
const userController = require("../../user/controller/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(verifyRoles(ROLES.ADMIN), userController.getAllUsers)
  .post(userController.createUser)
  .patch(verifyRoles(ROLES.ADMIN), userController.activateUser);

router.route("/get-user/:id").post(userController.getUser);

router.route("/delete-user/:id").post(userController.deleteUser);
router.route("/user-status/:id").post(userController.updateUserStatus);
router.route("/update-password/:id").post(userController.createUser);
router.route("/all-users").post(userController.getAllUsers);

module.exports = router;
