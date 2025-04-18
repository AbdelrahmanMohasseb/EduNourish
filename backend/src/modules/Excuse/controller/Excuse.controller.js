const { Excuse, Student, Parent } = require("../../../../DB/models/index");

exports.sendExcuse = async (req, res) => {
    try {
        const { id,studentId, parentId, reason } = req.body;

        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (parentId) {
            const parent = await Parent.findByPk(parentId);
            if (!parent) {
                return res.status(404).json({ message: "Parent not found" });
            }
        }

        const excuse = await Excuse.create({id, studentId, parentId, reason });

        res.status(201).json({ message: "Excuse request sent successfully", excuse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getExcuses = async (req, res) => {
    try {
        const excuses = await Excuse.findAll({ include: ["Student", "Parent"] });

        res.status(200).json(excuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateExcuseStatus = async (req, res) => {
    try {
        const { id } = req.params.id;
        const { status } = req.body;

        const excuse = await Excuse.findByPk(id);
        if (!excuse) {
            return res.status(404).json({ message: "Excuse request not found" });
        }

        excuse.status = status;
        await excuse.save();

        res.status(200).json({ message: "Excuse status updated", excuse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};