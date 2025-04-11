const express = require("express");
const router = express.Router();
const { sendPayment ,getStudentPayments} = require("../Payment/controller/payment.controller");
const { isParent ,isStudent} = require("../../middleware/auth"); 

router.post("/send", isParent, sendPayment);
router.get("/student", isStudent, getStudentPayments);

module.exports = router;
