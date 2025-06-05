const express = require("express");
const router = express.Router();
const { getStudentGradesReport } = require("../gradereport/controller/gradereport.controller");

router.get("/grades/report/:id", getStudentGradesReport);

module.exports = router;
