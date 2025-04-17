const express = require("express");
const router = express.Router();
const instructionController = require("../instructionAi/controller/instructionAi.controller");

router.post("/", instructionController.createInstruction);

module.exports = router;