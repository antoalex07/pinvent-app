const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleWare");
const { createProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload")

router.post("/", protect, upload.single("image"), createProduct);

module.exports = router;