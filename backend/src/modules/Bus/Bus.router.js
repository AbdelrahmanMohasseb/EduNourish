const express = require("express");
const router = express.Router();
const {createBus,getAllBuses,getBusById,updateBus,deleteBus} 
= require("../../../src/modules/Bus/controller/Bus.controller");

router.post("/", createBus);
router.get("/", getAllBuses);
router.get("/:id", getBusById);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = router;