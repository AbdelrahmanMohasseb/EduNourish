const Timetable = require("../../../../DB/models/timeTable");
const Class = require("../../../../DB/models/class");


exports.createTimetable = async (req, res) => {
  try {
    const { day, subject, time, classId } = req.body;
    const newTimetable = await Timetable.create({ day, subject, time, classId });
    res.status(201).json({ message: "Timetable created successfully", timetable: newTimetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.findAll();
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findByPk(req.params.id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getTimetableByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const classTimetable = await Timetable.findAll({ where: { classId } });
    res.status(200).json(classTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, subject, time } = req.body;
    const timetable = await Timetable.findByPk(id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    await timetable.update({ day, subject, time });
    res.status(200).json({ message: "Timetable updated", timetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findByPk(id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    await timetable.destroy();
    res.status(200).json({ message: "Timetable deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
