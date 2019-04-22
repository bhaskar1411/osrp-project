const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  sname: { type: String, required: true},
  semail: { type: String, required: true},
  stin: { type: Number, required: true},
  scst: { type: String, required: true},
  scontact: { type: Number, required: true},
  saddress: { type: String, required: true}
});

module.exports = mongoose.model('Supplier', supplierSchema);
