const {ClassTeacher, Teacher , Class } = require("../../../../DB/models/index");

exports.assignTeacherToClass = async (req, res) => {
  try {
    const { classId, teacherId, subject } = req.body;
    const newAssignment = await ClassTeacher.create({ classId, teacherId, subject });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeachersByClass = async (req, res) => {
    try {
      const { classId } = req.params;
  
      const teachers = await ClassTeacher.findAll({
        where: { classId },
        include: [
          {
            model: Teacher,
            attributes: ['teacherID', 'username', 'email'] 
          }
        ]
      });
  
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getClassesByTeacher = async (req, res) => {
  try {
    const { teacherId} = req.params;
    const classes = await ClassTeacher.findAll({ where: { teacherId },
        include: [
        {
          model: Class,
          attributes: ['className'] 
        }
      ]
     });
     
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
