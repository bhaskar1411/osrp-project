const express = require("express");
const qr = require("qr-image");
const multer = require("multer");
//const ejs = require('ejs')
const fs = require("fs");

const Product = require('../models/product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: () => {
    cb(null, Date.now()+ '.png');
  }
});

router.post("/qrcode",(req, res, next) => {
  const qr_filename = req.body.slno +'.png';
  qr.image(req.body.slno,{type: 'png', size: 10})
  .pipe(fs.createWriteStream(qr_filename));
 // multer({storage: storage}).single(qr.image(req.body.slno,{type: 'png', size: 10}));
  const product = new Product({
    billno: req.body.billno,
    tin: req.body.tin,
    slno: req.body.slno,
    doi: req.body.doi,
    waranty: req.body.waranty,
  });
  product.save();
  res.status(201).json({
    message: "product added successfully"
  });
 });

module.exports = router;
