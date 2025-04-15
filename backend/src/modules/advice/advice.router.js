const express = require('express');
const { validateAdvice } = require('../advice/adviceValidator');
const router = express.Router();
const {
  createAdviceFromFlask,
  getAllAdvice
} = require("../advice/controller/advice.controller");

// Destructure for cleaner route
router.get('/get', getAllAdvice);
router.post('/create', validateAdvice,createAdviceFromFlask);

module.exports = router;
