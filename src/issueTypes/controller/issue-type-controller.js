const issueTypeService = require("../service/issue-type");

const createIssueType = async (req, res) => {
  try {
    const issue = await issueTypeService.createIssueType(req.body);
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllIssueTypes = async (req, res) => {
  try {
    const issues = await issueTypeService.getAllIssueTypes();
    res.status(200).json(issues);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await issueTypeService.getIssueById(req.params.id);
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getIssueByName = async (req, res) => {
  try {
    const issue = await issueTypeService.getIssueByName(req.params.name);
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  createIssueType,
  getAllIssueTypes,
  getIssueById,
  getIssueByName,
};
