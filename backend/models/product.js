const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  billno: {type: String, required: true},
  tin: {type: Number, required: true},
  slno: {type: String, required: true},
  doi: {type: Date, required: true},
  waranty: {type: Number, required: true},
  qrimagefilename: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);
