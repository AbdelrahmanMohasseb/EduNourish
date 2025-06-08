const express = require("express");
const { createOrganizer, getAllOrganizers, getOrganizerById,getOrganizerByIdParam, updateOrganizer,updateOrganizerPhoto, deleteOrganizer } = require("../organizer/controller/organizer.controller");
const { validateOrganizer } = require('./organizerValidator');
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer"); 

const router = express.Router();

router.post("/", createOrganizer); // Create Organizer
router.get("/", getAllOrganizers); // Get All Organizers
router.get("/:id",auth(["organizer"]), getOrganizerById); // Get Organizer by ID
router.get("/byparam/:id", getOrganizerByIdParam); // Get Organizer by ID
router.put("/:id", updateOrganizer); // Update Organizer
router.put("/updatephoto/:id",upload.single("image"),updateOrganizerPhoto);
router.delete("/:id", deleteOrganizer); // Delete Organizer

module.exports = router;
