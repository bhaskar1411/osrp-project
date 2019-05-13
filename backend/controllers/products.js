const qr = require("qr-image");
const path = require("path");
const fs = require("fs");

const Product = require('../models/product');

const parentDir = './backend/images';
// console.log(parentDir);

//Generating QR code/image
exports.generateQr = (req, res, next) => {
  const qr_filename = req.body.slno +'.png';
  qr.image(req.body.slno,{type: 'png', size: 10})
  .pipe(fs.createWriteStream(path.join(parentDir, qr_filename)));
  const url = req.protocol + '://' + req.get('host');
  const product = new Product({
    billno: req.body.billno,
    tin: req.body.tin,
    slno: req.body.slno,
    doi: req.body.doi,
    waranty: req.body.waranty,
    qrimagefilename: url + '/images/' + qr_filename
  });
  product.save();
  res.status(201).json({
    message: "product added successfully"
  });
 }

 //Get all products
 exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const productQuery = Product.find();
  let fetchedProducts;
  if(pageSize && currentPage) {
    productQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  productQuery.then(documents => {
    fetchedProducts = documents;
    return Product.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "products fetched successfully",
      products: fetchedProducts,
      maxProducts: count
    });
  });
}

exports.getOneProduct = (req, res, nex) => {
  Product.findOne({slno: req.params.slno}).then(product => {
    if(product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({
        message: "Product not found"
      });
    }
  });
}
