const Project = require("../model/project");

const createProject = async (data) => {
  const project = new Project(data);

  try {
    await project.save();
    return { detail: "Project successfully created" };
  } catch (error) {
    throw new Error(`Error creating project: ${error.message}`);
  }
};

const getAllProjects = async () => {
  try {
    const projects = await Project.find().exec();
    return projects;
  } catch (error) {
    throw new Error(`Error retrieving projects: ${error.message}`);
  }
};

const getProject = async (project_name) => {
  try {
    const project = await Project.findOne({
      project_name: project_name,
    }).exec();
    if (!project) {
      throw new Error(`Project not found`);
    }
    return project;
  } catch (error) {
    throw new Error(`Error retrieving project: ${error.message}`);
  }
};

const getProjectById = async (project_id) => {
  const project = await Project.findOne({ project_id: project_id }).exec();
  if (!project) {
    throw new Error(`Project not found`);
  }
  return project;
};

const updateProject = async (project_id, updateData) => {
  try {
    const res = await Project.updateOne(
      { project_id: project_id },
      { $set: updateData }
    ).exec();

    if (res.modifiedCount > 0) {
      return { detail: "Project successfully updated." };
    } else {
      return { detail: "Project not found or no changes made." };
    }
  } catch (error) {
    throw new Error(`Error updating project: ${error.message}`);
  }
};

const deleteProject = async (project_id) => {
  try {
    const res = await Project.updateOne(
      { _id: project_id },
      { $set: { is_deleted: true } }
    ).exec();

    if (res.modifiedCount > 0) {
      return { detail: "Project successfully deleted." };
    } else {
      return { detail: "Project not found or already deleted." };
    }
  } catch (error) {
    throw new Error(`Error deleting project: ${error.message}`);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
};
