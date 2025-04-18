const { Attendance, Teacher } = require("../../../../DB/models/index");


// exports.createAttendance = async (req, res) => {
//   try {
//     const { id ,date, status, remarks,studentId,teacherID} = req.body;
//     const newAttendance = await Attendance.create({ id, date, status, remarks,studentId,teacherID});
//     res.status(201).json(newAttendance);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating attendance", details: error.message });
//   }
// };

exports.createAttendance = async (req, res) => {
  try {
    const {  date, status, remarks, studentId, teacherID } = req.body;
 console.log('REQ BODY:', req.body);  // Debug log
    const attendance = await Attendance.create({
     
      date,
      status,
      remarks,
      studentId,
      teacherID
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      error: "Error creating attendance",
      details: error.message || error
    });
  }
};



exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance records", details: error.message });
  }
};


exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          attributes: ['id', 'userName', 'email'], 
        },
        {
          model: Teacher,
          attributes: ['id', 'userName', 'email'],
        }
      ]
    });

    if (!attendance) return res.status(404).json({ error: "Attendance record not found" });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance record", details: error.message });
  }
};



exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: "Attendance record not found" });

    await attendance.update(req.body);
    res.status(200).json({ message: "Attendance record updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: "Error updating attendance record", details: error.message });
  }
};


exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ error: "Attendance record not found" });

    await attendance.destroy();
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting attendance record", details: error.message });
  }
};