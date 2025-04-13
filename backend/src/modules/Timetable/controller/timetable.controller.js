const {TimeTable,Class} = require("../../../../DB/models/index");


exports.createTimetable = async (req, res) => {
  try {
    const {id, day, subject, time, classId } = req.body;
    const newTimetable = await TimeTable.create({ id,day, subject, time, classId });
    res.status(201).json({ message: "Timetable created successfully", timetable: newTimetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await TimeTable.findAll();
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTimetableById = async (req, res) => {
  try {
    const timetable = await TimeTable.findByPk(req.params.id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTimetableByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const classTimetable = await TimeTable.findAll({ where: { classId } });
    res.status(200).json(classTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTimetable = async (req, res) => {
  try {
    const timetable = await TimeTable.findByPk(req.params.id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    await timetable.update( req.body );
    res.status(200).json({ message: "Timetable updated", timetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteTimetable = async (req, res) => {
  try {
    
    
    const timetable = await TimeTable.findByPk(req.params.id);
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    await timetable.destroy();
    res.status(200).json({ message: "Timetable deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
