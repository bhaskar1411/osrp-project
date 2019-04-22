const express = require("express");

const Supplier = require('../models/supplier');

const router = express.Router();

router.post("/", (req, res, next) => {
  const supplier = new Supplier({
    sname: req.body.sname,
    semail: req.body.semail,
    stin: req.body.stin,
    scst: req.body.scst,
    scontact: req.body.scontact,
    saddress: req.body.saddress
  });
  supplier.save();
  res.status(201).json({
    message: "supplier added successfully"
  });
});

router.put('/:id', (req, res, next) => {
  const supplier = new Supplier({
    _id: req.body.id,
    sname: req.body.sname,
    semail: req.body.semail,
    stin: req.body.stin,
    scst: req.body.scst,
    scontact: req.body.scontact,
    saddress: req.body.saddress
  });
  Supplier.updateOne({_id: req.params.id}, supplier).then(result => {
    res.status(200).json({
      message: "update successful"
    });
  });
});

router.get('/', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const supplierQuery = Supplier.find();
  let fetchedSuppliers;
  if(pageSize && currentPage) {
    supplierQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  supplierQuery.then(documents => {
    fetchedSuppliers = documents;
    return Supplier.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "suppliers fetched successfully",
      suppliers: fetchedSuppliers,
      maxSuppliers: count
    });
  });
});

router.get('/:id', (req, res, next) => {
  Supplier.findById(req.params.id).then(supplier => {
    if(supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({
        message: "supplier not found!!"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Supplier.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "supplier deleted"
    });
  });
});

module.exports = router;
