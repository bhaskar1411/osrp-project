const express = require("express");

const checkAuth = require("../middleware/check-auth");

const BillController = require("../controllers/bills");

const router = express.Router();

router.post("/", checkAuth, BillController.addBill );

router.put('/:id', checkAuth, BillController.updateBill);

router.get('/', checkAuth, BillController.getBills);

router.get('/:id', checkAuth, BillController.getOneBill);

router.get('/:billno', checkAuth, BillController.getBillbybillno);

router.delete("/:id", checkAuth, BillController.deleteBill);

module.exports = router;
