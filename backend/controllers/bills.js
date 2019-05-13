const Bill = require("../models/bill");
const Supplier = require("../models/supplier");


//Add bill
exports.addBill = (req, res, next) => {
  Supplier.findOne({stin: req.body.tin})
  .then(supplier => {
    if(!supplier){
      return res.status(200).json({
        message: "Supplier not exist!! Please enter Supplier Details",
        suppliertin: false
      });
    }
    const bill = new Bill({
      lab: req.body.lab,
      billno: req.body.billno,
      dop: req.body.dop,
      tin: req.body.tin,
      spec: req.body.spec,
      rate: req.body.rate,
      quantity: req.body.quantity,
      gst: req.body.gst,
      amount: req.body.amount
    });
    bill.save();
    res.status(200).json({
      message: "Bill Added Successfully",
      suppliertin: true
      });
  });
  // const bill = new Bill({
  //   lab: req.body.lab,
  //   billno: req.body.billno,
  //   dop: req.body.dop,
  //   tin: req.body.tin,
  //   spec: req.body.spec,
  //   rate: req.body.rate,
  //   quantity: req.body.quantity,
  //   gst: req.body.gst,
  //   amount: req.body.amount
  // });
  // bill.save().then(createdBill => {
  //   res.status(201).json({
  //     message: "bill added successfully",
  //     billId: createdBill._id
  //   });
  // });
}

//Update bill
exports.updateBill = (req, res, next) => {
  const bill = new Bill({
    _id: req.body.id,
    lab: req.body.lab,
    billno: req.body.billno,
    dop: req.body.dop,
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
}

//Get all bills
exports.getBills = (req, res, next) => {
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
}

//get a bill detail
exports.getOneBill = (req, res, next) => {
  Bill.findById(req.params.id).then(bill => {
    if(bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({
        message: "Bill not found!!"
      });
    }
  });
}

//Delete a bill
exports.deleteBill = (req, res, next) => {
  Bill.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "bill deleted"
    });
  });
}
//get by bill number
exports.getBillbybillno = (req, res, next) => {
  console.log(req.params.billno);
  Bill.findOne({billno: req.params.billno}).then(bill => {
    if(bill) {
      console.log(bill);
      res.status(200).json(bill);
    } else {
      res.status(400).json({
        message: "bill not found"
      });
    }
  });
}
