const { Payment, Student, Parent } = require("../../../../DB/models/index");

exports.sendPayment = async (req, res) => {
  try {
    const { studentId, amount, method, note } = req.body;
    const parentId = req.user.id; 

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payment = await Payment.create({
      studentId,
      parentId,
      amount,
      method,
      note,
      status: "completed"
    });

    res.status(201).json({
      message: "Payment sent successfully",
      payment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getStudentPayments = async (req, res) => {
    try {
      const studentId = req.params.id; 
  
      const payments = await Payment.findAll({
        where: { studentId },
        include: ["Parent"], 
        order: [["createdAt", "DESC"]]
      });
  
      res.status(200).json({
        message: "Student payments retrieved successfully",
        payments
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  