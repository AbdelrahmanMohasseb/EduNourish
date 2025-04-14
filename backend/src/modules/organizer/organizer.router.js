const express = require("express");
const { createOrganizer, getAllOrganizers, getOrganizerById, updateOrganizer, deleteOrganizer } = require("../organizer/controller/organizer.controller");

const router = express.Router();

router.post("/", createOrganizer); // Create Organizer
router.get("/", getAllOrganizers); // Get All Organizers
router.get("/:id", getOrganizerById); // Get Organizer by ID
router.put("/:id", updateOrganizer); // Update Organizer
router.delete("/:id", deleteOrganizer); // Delete Organizer

module.exports = router;
