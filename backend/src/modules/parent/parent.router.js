const express = require("express");
const router = express.Router();
const parentController = require("./controller/parent.controller");
const auth = require("../../middleware/auth"); 


router.post("/", parentController.createParent);
router.get("/",  parentController.getAllParents);
router.get("/:id",  parentController.getParentById);
router.put("/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

//signin
router.post("/signin", parentController.signin);



module.exports = router;
