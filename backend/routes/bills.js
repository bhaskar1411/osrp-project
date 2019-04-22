const express = require("express");

const Bill = require("../models/bill");

const router = express.Router();

router.post("/", (req, res, next) => {
  const bill = new Bill({
    lab: req.body.lab,
    billno: req.body.billno,
    //dop: req.body.dop,
    tin: req.body.tin,
    spec: req.body.spec,
    rate: req.body.rate,
    quantity: req.body.quantity,
    gst: req.body.gst,
    amount: req.body.amount
  });
  bill.save().then(createdBill => {
    res.status(201).json({
      message: "bill added successfully",
      billId: createdBill._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const bill = new Bill({
    _id: req.body.id,
    lab: req.body.lab,
    billno: req.body.billno,
   //dop: req.body.dop,
    tin: req.body.tin,
    spec: req.body.spec,
    rate: req.body.rate,
    quantity: req.body.quantity,
    gst: req.body.gst,
    amount: req.body.amount
  });
  Bill.updateOne({ _id: req.params.id}, bill ).then( result =>{
    res.status(200).json({
      message: "update successful"
    });
  });
});

router.get('/', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const billQuery = Bill.find();
  let fetchedBills;
  if(pageSize && currentPage) {
    billQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  billQuery.then(documents => {
    fetchedBills = documents;
    return Bill.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message : "bills fetched successfully",
      bills: fetchedBills,
      maxBills: count
    });
  });
});

router.get('/:id', (req, res, next) => {
  Bill.findById(req.params.id).then(bill => {
    if(bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({
        message: "Bill not found!!"
      });
    }
  });
});

router.delete("/:id",(req, res, next) => {
  Bill.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "bill deleted"
    });
  });
});


module.exports = router;
