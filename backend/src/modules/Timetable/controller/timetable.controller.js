const { TimeTable, Student } = require("../../../../DB/models/index");

exports.addTimetable = async (req, res) => {
    try {
        const { id, day, subject, time ,studentId} = req.body; 

        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const newTimetable = await TimeTable.create({  id, day, subject, time,studentId });

        res.status(201).json({ message: "Timetable entry added", timetable: newTimetable });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTimetableByStudent = async (req, res) => {
    try {
        const { id } = req.params; 

        const timetable = await TimeTable.findAll({ where: {  id } });

        if (timetable.length === 0) {
            return res.status(404).json({ message: "No timetable found for this student" });
        }

        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const { day, subject, time } = req.body;

        const timetableEntry = await TimeTable.findByPk(id);
        if (!timetableEntry) {
            return res.status(404).json({ message: "Timetable entry not found" });
        }

        await timetableEntry.update({ day, subject, time });

        res.status(200).json({ message: "Timetable entry updated", timetable: timetableEntry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTimetable = async (req, res) => {
    try {
        const { id } = req.params;

        const timetableEntry = await TimeTable.findByPk(id);
        if (!timetableEntry) {
            return res.status(404).json({ message: "Timetable entry not found" });
        }

        await timetableEntry.destroy();

        res.status(200).json({ message: "Timetable entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
