const express = require("express");
const router = express.Router();
const issueController = require("../../issueTypes/controller/issue-type-controller");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(issueController.getAllIssueTypes)
  .post(verifyRoles([ROLES.ADMIN]), issueController.createIssueType);

router.route("/id/:id").get(issueController.getIssueById);
router.route("/name/:name").get(issueController.getIssueByName);

module.exports = router;
