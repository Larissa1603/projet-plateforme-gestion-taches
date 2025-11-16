// const express = require('express');
// const router = express.Router();
// const projectCtrl = require('../controllers/projectController');

// router.get('/', projectCtrl.getProjects);
// router.post('/', projectCtrl.createProject);

// module.exports = router;


const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET tous les projets
router.get('/', projectController.getAllProjects);

// POST créer un projet
router.post('/', projectController.createProject);

module.exports = router;