const express = require("express");
const router = express.Router();
const menuController = require("../resturantMenuItem/controller/resturantMenuItem.controller");
const { isAdmin, isStudent } = require("../../middleware/auth"); 

router.post("/add", isAdmin, menuController.addMenuItem);   
router.put("/update/:id", isAdmin, menuController.updateMenuItem); 
router.delete("/delete/:id", isAdmin, menuController.deleteMenuItem);  
router.get("/view", isStudent, menuController.getMenu);  


module.exports = router;