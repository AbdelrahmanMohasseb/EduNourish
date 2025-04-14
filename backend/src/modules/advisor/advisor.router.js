const express = require("express");
const { createAdvisor, getAllAdvisors, getAdvisorById, updateAdvisor, deleteAdvisor } = require("../advisor/controller/advisor.controller");

const router = express.Router();

router.post("/", createAdvisor); // Create Advisor
router.get("/", getAllAdvisors); // Get All Advisors
router.get("/:id", getAdvisorById); // Get Advisor by ID
router.put("/:id", updateAdvisor); // Update Advisor
router.delete("/:id", deleteAdvisor); // Delete Advisor

module.exports = router;
