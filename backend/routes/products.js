const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/products");

const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, ProductController.generateQr);

router.get('/', checkAuth, ProductController.getProducts);

router.get('/:slno', checkAuth, ProductController.getOneProduct);

module.exports = router;
