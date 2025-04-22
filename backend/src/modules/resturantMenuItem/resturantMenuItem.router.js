const express = require("express");
const router = express.Router();
const menuController = require("../resturantMenuItem/controller/resturantMenuItem.controller");

router.post("/add", menuController.addMenuItem);   
router.put("/update/:id", menuController.updateMenuItem); 
router.delete("/delete/:id",  menuController.deleteMenuItem);  
router.get("/view",  menuController.getMenu);  


module.exports = router;