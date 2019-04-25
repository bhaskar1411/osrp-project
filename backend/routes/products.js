const express = require("express");
const qr = require("qr-image");
const path = require("path");
const fs = require("fs");

const Product = require('../models/product');

const router = express.Router();

const parentDir = './backend/images';

router.post("/qrcode",(req, res, next) => {
  const qr_filename = req.body.slno +'.png';
  qr.image(req.body.slno,{type: 'png', size: 10})
  .pipe(fs.createWriteStream(path.join(parentDir, qr_filename)));
  const product = new Product({
    billno: req.body.billno,
    tin: req.body.tin,
    slno: req.body.slno,
    doi: req.body.doi,
    waranty: req.body.waranty,
    qrimagefilename: qr_filename
  });
  product.save();
  res.status(201).json({
    message: "product added successfully"
  });
 });

module.exports = router;
