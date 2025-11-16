const Assignment = require('../models/Assignment');

exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find().populate("project").populate("user");
    res.json(assignments);
};

exports.createAssignment = async (req, res) => {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
};