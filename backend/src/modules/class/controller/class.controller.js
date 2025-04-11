// controllers/classController.js
const Class = require("../../../../DB//models/class");

exports.createClass = async (req, res) => {
    try {
        const { id,className } = req.body;
        const newClass = await Class.create({ id,className });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const foundClass = await Class.findByPk(classId);
        if (!foundClass) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json(foundClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const [updated] = await Class.update(req.body, {
            where: { id: classId }
        });
        if (updated === 0) {
            return res.status(404).json({ error: "Class not found" });
        }
        const updatedClass = await Class.findByPk(classId);
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const deleted = await Class.destroy({
            where: { id: classId }
        });
        if (deleted === 0) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(204).json(); // 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};