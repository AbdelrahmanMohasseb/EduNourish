const express = require("express");
const router = express.Router();
const { generateReportAndSend } = require("../report/controller/report.controller");

router.post("/send-report", generateReportAndSend);

module.exports = router;