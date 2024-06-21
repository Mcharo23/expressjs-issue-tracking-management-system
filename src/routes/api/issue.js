const express = require("express");
const router = express.Router();
const issueController = require("../../issueTypes/controller/issueController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../utils/uer-role");

router
  .route("/")
  .get(verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER), issueController.getAllIssues)
  .post(verifyRoles(ROLES.ADMIN), issueController.createIssue);

router
  .route("/progress/:issue_id")
  .get(verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER), issueController.getIssue);

router
  .route("/assignee")
  .get(
    verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),
    issueController.getAllIssueByAssigneeId
  );
router
  .route("/assign")
  .post(verifyRoles(ROLES.ADMIN), issueController.assignIssueToDeveloper);

router
  .route("/status")
  .put(
    verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),
    issueController.updateIssueStatus
  );

router
  .route("/comment/:id")
  .get(
    verifyRoles(ROLES.ADMIN, ROLES.DEVELOPER),
    issueController.getCommentByIssueId
  );

module.exports = router;
