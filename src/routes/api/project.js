const express = require("express");
const router = express.Router();
const projectController = require("../../project/controller/projectController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),projectController.getAllProjects)
  .post(verifyRoles(ROLES.ADMIN), projectController.createProject);

router.route("/:id").get(verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),projectController.getProjectById);

module.exports = router;
