const issueService = require("../service/issueService");

const createIssue = async (req, res) => {
  try {
    const issue = await issueService.createIssue(req.body);
    res.status(201).json(issue);
  } catch (error) {
    if (error.message === "Project not found") {
      res.status(404).json({ detail: "Project not found" });
    } else if (error.message === "not found") {
      res.status(404).json({ detail: "Issue type not found" });
    } else {
      console.error(error);
      res.status(400).send(error);
    }
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await issueService.getAllIssues();
    res.status(200).json(issues);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllIssueByAssigneeId = async (req, res) => {
  try {
    const issues = await issueService.getAllIssueByAssigneeId(req.params.id);
    res.status(200).json(issues);
  } catch (error) {
    res.status(400).send(error);
  }
};

const assignIssueToDeveloper = async (req, res) => {
  try {
    const issue_id = req.body.issue_id;
    const assignee_id = req.body.assignee_id;
    const issue_type_id = req.body.issue_type_id;

    const issue = await issueService.assignIssueToDeveloper(
      issue_id,
      assignee_id,
      issue_type_id
    );
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateIssueStatus = async (req, res) => {
  try {
    const issue = await issueService.updateIssueStatus(
      req.body.assignee_id,
      req.body.issue_id,
      req.body.status
    );
    res.status(200).json(issue);
  } catch (error) {
    if (error.message === "unauthorized") {
      res
        .status(401)
        .json({ detail: "You have no permission to make changes" });
    } else {
      res.status(400).send(error);
    }
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getAllIssueByAssigneeId,
  assignIssueToDeveloper,
  updateIssueStatus,
};
