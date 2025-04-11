const express = require("express");
const router = express.Router();
const { Parent, Student } = require("../../../DB/models/index"); 
const { isParent } = require("../../middleware/auth"); 

router.put("/set-pocket-money/:studentId", isParent, async (req, res) => {
    try {
        const { studentId } = req.params;
        const { amount } = req.body; 
        
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // تحديث المصروف
        student.pocketmoney += amount;
        await student.save();

        res.status(200).json({ message: "Pocket money updated successfully", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/get-pocket-money/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ pocketMoney: student.pocketmoney });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
