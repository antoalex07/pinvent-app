const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleWare");
const { createProduct } = require("../controllers/productController");

router.post("/", protect, createProduct);

module.exports = router;