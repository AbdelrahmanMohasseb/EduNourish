const express = require("express");
const router = express.Router();
const{sendExcuse,getExcuses,updateExcuseStatus}=require("./controller/Excuse.controller")

router.post("/",sendExcuse);
router.get("/",getExcuses);
router.put("/:id",updateExcuseStatus);

module.exports = router;