const express = require("express");
const { createAdvisor, getAllAdvisors, getAdvisorById, updateAdvisor,updateAdvisorPhoto, deleteAdvisor } = require("../advisor/controller/advisor.controller");
const { validateAdvisor } = require('./advisorValidator');
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer"); 


const router = express.Router();

router.post("/",validateAdvisor, createAdvisor); // Create Advisor
router.get("/", getAllAdvisors); // Get All Advisors
router.get("/:id",auth(["advisor"]), getAdvisorById); // Get Advisor by ID
router.put("/:id",updateAdvisor); // Update 
router.put("/updatephoto/:id",upload.single("image"),updateAdvisorPhoto);
router.delete("/:id", deleteAdvisor); // Delete Advisor

module.exports = router;
