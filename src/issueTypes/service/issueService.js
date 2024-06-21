const Issue = require("../model/issue");
const Comment = require("../model/comment");
const Project = require("../../project/model/project");
const IssueType = require("../../issueTypes/model/issue-type");
const User = require("../../user/model/user");

const userService = require("../../user/service/userService");
const projectService = require("../../project/service/projectService");
const issueTypeService = require("./issue-type");
const { PRIORITY, STATUS } = require("../../utils/enum");

const createIssue = async (data) => {
  await projectService.getProjectById(data.project_id);

  await issueTypeService.getIssueById(data.issue_type_id);

  try {
    if (!PRIORITY.includes(data.priority)) {
      return { detail: "Invalid priority value." };
    }
    if (!STATUS.includes(data.status)) {
      return { detail: "Invalid status value." };
    }

    const newIssue = new Issue(data);
    await newIssue.save();

    return { detail: "Issue created successfully!" };
  } catch (error) {
    throw new Error(error);
  }
};

const getIssue = async (issue_id) => {
  try {
    const issue = await Issue.findOne({ issue_id: issue_id }).exec();

    if (!issue) {
      throw new Error("Issue not found");
    }

    const project = await Project.findOne({
      project_id: issue.project_id,
    })
      .select("-issues")
      .exec();

    if (!project) {
      throw new Error("Project not found");
    }

    const issueType = await IssueType.findOne({
      issue_type_id: issue.issue_type_id,
    }).exec();

    if (!issueType) {
      throw new Error("issue type not found");
    }

    let developer = null;
    if (issue.assignee_id) {
      developer = await User.findOne({ user_id: issue.assignee_id })
        .select("-password")
        .select("-assigned_issues")
        .select("-reported_issues")
        .exec();
    }

    const comments = await Comment.find({ issue_id: issue_id }).exec();

    const populatedIssue = {
      issue_id: issue.issue_id,
      project: project,
      issue_type: issueType,
      summary: issue.summary,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
      developer: developer,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      comments: comments,
    };

    return populatedIssue;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllIssues = async () => {
  try {
    const issues = await Issue.find().exec();

    const populatedIssues = await Promise.all(
      issues.map(async (issue) => {
        let projectName = null;
        let developerName = null;
        let issueTypeName = null;

        try {
          const project = await projectService.getProjectById(issue.project_id);
          projectName = project ? project.project_name : null;
        } catch (projectError) {
          console.error(
            `Error fetching project for issue: ${projectError.message}`
          );
        }

        try {
          const developer = issue.assignee_id
            ? await userService.getUser(issue.assignee_id)
            : null;
          developerName = developer
            ? developer.first_name.concat(" ", developer.last_name)
            : null;
        } catch (userError) {
          console.error(
            `Error fetching developer for issue: ${userError.message}`
          );
        }

        try {
          const issueType = await issueTypeService.getIssueById(
            issue.issue_type_id
          );
          issueTypeName = issueType ? issueType.name : null;
        } catch (issueTypeError) {
          console.error(
            `Error fetching issue type for issue: ${issueTypeError.message}`
          );
        }

        return {
          ...issue.toObject(),
          project_name: projectName,
          developer: developerName,
          issue_type: issueTypeName,
        };
      })
    );

    return populatedIssues;
  } catch (error) {
    throw new Error(`Error while getting issues: ${error.message}`);
  }
};

const getAllIssueByAssigneeId = async (assignee_id) => {
  try {
    const issues = await Issue.find({ assignee_id: assignee_id }).exec();

    const populatedIssues = await Promise.all(
      issues.map(async (issue) => {
        let projectName = null;
        let developerName = null;
        let issueTypeName = null;

        try {
          const project = await projectService.getProjectById(issue.project_id);
          projectName = project ? project.project_name : null;
        } catch (projectError) {
          console.error(
            `Error fetching project for issue: ${projectError.message}`
          );
        }

        try {
          const developer = issue.assignee_id
            ? await userService.getUser(issue.assignee_id)
            : null;
          developerName = developer
            ? developer.first_name.concat(" ", developer.last_name)
            : null;
        } catch (userError) {
          console.error(
            `Error fetching developer for issue: ${userError.message}`
          );
        }

        try {
          const issueType = await issueTypeService.getIssueById(
            issue.issue_type_id
          );
          issueTypeName = issueType ? issueType.name : null;
        } catch (issueTypeError) {
          console.error(
            `Error fetching issue type for issue: ${issueTypeError.message}`
          );
        }

        return {
          ...issue.toObject(),
          project_name: projectName,
          developer: developerName,
          issue_type: issueTypeName,
        };
      })
    );

    return populatedIssues;
  } catch (error) {
    throw new Error(`Error while getting issues: ${error.message}`);
  }
};

const assignIssueToDeveloper = async (issue_id, assignee_id) => {
  const update = {
    assignee_id: assignee_id,
  };

  await userService.getUser(assignee_id);

  try {
    const result = await Issue.updateOne({ issue_id: issue_id }, update).exec();

    if (result.modifiedCount === 1) {
      return { detail: "Issue updated successfully!" };
    }
    return { detail: "Issue update failed!" };
  } catch (error) {
    throw new Error(`Error updating project: ${error.message}`);
  }
};

const updateIssueStatus = async (
  assignee_id,
  issue_id,
  commentText,
  status
) => {
  try {
    const issue = await Issue.findOne({ issue_id: issue_id }).exec();

    if (!issue) {
      throw new Error("Issue not found");
    }

    if (issue.assignee_id !== assignee_id) {
      throw new Error("unauthorized");
    }

    if (!STATUS.includes(status)) {
      return { detail: "Invalid status value." };
    }

    const comment = new Comment({
      issue_id: issue_id,
      user_id: assignee_id,
      comment: commentText,
    });

    await comment.save();

    issue.status = status;
    issue.comments.push(comment.comment_id);
    await issue.save();

    return { detail: "Status successfully updated and comment added" };
  } catch (error) {
    throw new Error(error);
  }
};

const getCommentByIssueId = async (issue_id) => {
  try {
    const issue = await Issue.findOne({ issue_id: issue_id }).exec();

    if (!issue) {
      throw new Error("Issue not found");
    }

    const comments = await Comment.find({ issue_id: issue_id }).exec();

    return comments;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getAllIssueByAssigneeId,
  assignIssueToDeveloper,
  updateIssueStatus,
  getCommentByIssueId,
  getIssue,
};
