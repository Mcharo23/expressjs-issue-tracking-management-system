const projectService = require("../service/projectService");

const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getProjectById = async (req, res) => {
  try {
    console.log(req.params.id);
    const project = await projectService.getProjectById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    if (error.message === "not found") {
      res.status(404).json({ detail: "Project not found" });
    } else {
      console.error(error);
      res.status(400).send(error);
    }
  }
};

const getProject = async (req, res) => {
  try {
    const project = await projectService.getProject(req.params.project_name);
    res.status(200).json(project);
  } catch (error) {
    if (error.message === "not found") {
      res.status(404).json({ detail: "Project not found" });
    } else {
      console.error(error);
      res.status(400).send(error);
    }
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id.req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).send(error);
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
