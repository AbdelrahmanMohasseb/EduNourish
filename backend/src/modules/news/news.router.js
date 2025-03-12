const express = require("express");
const router = express.Router();
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require("../news/controller/news.controller");

// ✅ Create News
router.post("/", createNews);

// ✅ Get All News
router.get("/", getAllNews);

// ✅ Get News by ID
router.get("/:id", getNewsById);

// ✅ Update News
router.put("/:id", updateNews);

// ✅ Delete News
router.delete("/:id", deleteNews);

module.exports = router;
