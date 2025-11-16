const Project = require('../models/Project');

// GET tous les projets
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);  // <- c’est CE qui envoie la réponse à Postman
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST créer un projet
exports.createProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// const Project = require('../models/Project');

// exports.getProjects = async (req, res) => {
//     const projects = await Project.find();
//     res.json(projects);
// };

// exports.createProject = async (req, res) => {
//     const project = new Project(req.body);
//     await project.save();
//     res.json(project);
// };