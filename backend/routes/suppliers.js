const express = require("express");

const SupplierController = require("../controllers/suppliers");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuth, SupplierController.addSupplier);

router.put('/:id', checkAuth, SupplierController.updateSupplier);

router.get('/', checkAuth, SupplierController.getSuppliers);

router.get('/:id', checkAuth, SupplierController.getOneSupplier);

router.get('/:stin', checkAuth, SupplierController.getSupplierbyTIN);

router.delete("/:id", checkAuth, SupplierController.deleteSupplier);

module.exports = router;
