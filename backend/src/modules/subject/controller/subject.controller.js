const {Subject, Teacher} = require("../../../../DB/models/index");


exports.createSubject = async (req, res) => {
    try {

        const {SubjectID, name, code, category, gradeLevel, semester, description ,studentId} = req.body;
        const subject = await Subject.create({
           
            SubjectID,
            name,
            code,
            category,
            gradeLevel,
            semester,
            description,
            studentId
        });
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subject', error });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id,{
            include: [{
              model: Teacher
              // ,as: 'students' // Optional: Specify the alias for the association
            }]});
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        await subject.update(req.body);
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        await subject.destroy();
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
