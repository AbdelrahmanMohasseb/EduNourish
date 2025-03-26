const express = require("express");
const router = express.Router();
const {
  createAdvice,
  getAllAdvice,
  getAdviceById,
  updateAdvice,
  deleteAdvice,
} = require("../../modules/advice/controller/advice.controller");

router.post("/", createAdvice);
router.get("/", getAllAdvice);
router.get("/:id", getAdviceById);
router.put("/:id", updateAdvice);
router.delete("/:id", deleteAdvice);

module.exports = router;
