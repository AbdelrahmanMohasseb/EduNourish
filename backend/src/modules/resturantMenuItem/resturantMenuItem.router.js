const express = require("express");
const router = express.Router();
const menuController = require("../resturantMenuItem/controller/resturantMenuItem.controller");

router.post("/menu",menuController.addMenuItem);
router.put("/menu/:id",menuController.updateMenuItem);
router.delete("/menu/:id", menuController.deleteMenuItem);
router.get("/menu",menuController.getMenu);

module.exports = router;
