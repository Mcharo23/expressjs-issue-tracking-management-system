const IssueType = require("../model/issue-type");

const createIssueType = async (data) => {
  const issueType = new IssueType(data);

  try {
    await issueType.save();
    return { detail: "Issue type successfully created" };
  } catch (error) {
    throw new Error(`Error creating issue type: ${error.message}`);
  }
};

const getAllIssueTypes = async () => {
  try {
    const issues = await IssueType.find().exec();
    return issues;
  } catch (error) {
    throw new Error(`Error retrieving retrieving: ${error.message}`);
  }
};

const getIssueById = async (issue_type_id) => {
  const issue = await IssueType.findOne({
    issue_type_id: issue_type_id,
  }).exec();

  if (!issue) {
    throw new Error(`not found`);
  }

  return issue;
};

const getIssueByName = async (name) => {
  const issue = await IssueType.findOne({ name: name }).exec();

  if (!issue) {
    throw new Error(`not found`);
  }

  return issue;
};

module.exports = {
  createIssueType,
  getAllIssueTypes,
  getIssueById,
  getIssueByName,
};
