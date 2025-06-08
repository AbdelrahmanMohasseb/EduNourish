const express = require("express");
const router = express.Router();

const parentController = require("../parent/controller/parent.controller");

const { validateParent } = require('./parentValidator');
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer"); 


router.post("/",validateParent ,parentController.createParent);
router.get("/",  parentController.getAllParents);
router.get("/:id",auth(["parent"]),  parentController.getParentById);
router.get("/byparam/:id",  parentController.getParentByIdParam);
router.put("/:id", parentController.updateParent);
router.put("/updatephoto/:id",upload.single("image"),parentController.updateParenPhoto);
router.delete("/:id", parentController.deleteParent);




module.exports = router;
