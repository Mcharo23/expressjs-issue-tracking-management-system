const express = require("express");
const router = express.Router();
const issueController = require("../../issueTypes/controller/issueController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(issueController.getAllIssues)
  .post(verifyRoles(ROLES.ADMIN), issueController.createIssue);

router
  .route("/:id")
  .get(
    verifyRoles([ROLES.ADMIN, ROLES.DEVELOPER]),
    issueController.getAllIssueByAssigneeId
  );
router
  .route("/assign")
  .post(verifyRoles([ROLES.ADMIN]), issueController.assignIssueToDeveloper);

router
  .route("/status")
  .post(
    verifyRoles([ROLES.ADMIN, ROLES.DEVELOPER]),
    issueController.updateIssueStatus
  );

module.exports = router;
