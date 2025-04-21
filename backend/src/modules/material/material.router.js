const express = require("express");
const router = express.Router();
const materialController = require("../material/controller/material.controller");
const upload = require("../../middleware/multer");

router.post("/", upload.fields([
  { name: 'pdf', maxCount: 3 },
  { name: 'image', maxCount: 2 }
]), materialController.createMaterial);


router.get("/", materialController.getAllMaterials);


router.get("/:id", materialController.getMaterialById);


router.put("/:id", upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), materialController.updateMaterial);


router.delete("/:id", materialController.deleteMaterial);

module.exports = router;
