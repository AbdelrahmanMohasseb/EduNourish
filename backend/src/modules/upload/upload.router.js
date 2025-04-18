const express = require("express");
const upload = require("../../middleware/multer"); 
const { uploadProfilePicture } = require("../upload/controller/upload.controller");

const router = express.Router();


router.post("/", upload.single("image"), uploadProfilePicture);

module.exports = router;