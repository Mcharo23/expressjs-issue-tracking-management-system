const express = require("express");
const router = express.Router();
const userController = require("../../user/controller/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(verifyRoles(ROLES.ADMIN), userController.getAllUsers)
  .post(verifyRoles(ROLES.ADMIN), userController.createUser)
  .put(verifyRoles(ROLES.ADMIN), userController.activateUser)
  .delete(verifyRoles(ROLES.ADMIN), userController.deleteUser)
  .patch(
    verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),
    userController.updateUserPassword
  );

router.route("/get-user/:id").post(userController.getUser);

router.route("/update-password/:id").post(userController.updateUserPassword);

module.exports = router;
