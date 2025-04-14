const express = require("express");
const router = express.Router();
const parentController = require("../parent/controller/parent.controller");

router.post("/", parentController.createParent);
router.get("/", parentController.getAllParents);
router.get("/:id", parentController.getParentById);
router.put("/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

module.exports = router;