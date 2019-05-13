const Supplier = require('../models/supplier');

//Add supplier
exports.addSupplier = (req, res, next) => {
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
}

//update supplier
exports.updateSupplier = (req, res, next) => {
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
}

//get all supplier list
exports.getSuppliers =  (req, res, next) => {
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
}

//get one supplier detail
exports.getOneSupplier =  (req, res, next) => {
  Supplier.findById(req.params.id).then(supplier => {
    if(supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({
        message: "supplier not found!!"
      });
    }
  });
}

//get supplier by tin
exports.getSupplierbyTIN = (req, res, next) => {
  Supplier.findOne({stin:req.params.stin}).then(supplier => {
    if(supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({
      message: "supplier not found!"
     });
    }
  });
}

//Delete Supplier
exports.deleteSupplier = (req, res, next) => {
  Supplier.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "supplier deleted"
    });
  });
}
