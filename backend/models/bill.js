const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  lab: {type: String, required: true},
  billno: {type: String, required: true},
  dop: {type: String, required: true},
  tin: {type: Number, required: true},
  spec: {type: String, required: true},
  rate: {type: Number, required: true},
  quantity: {type: Number, required: true},
  gst: {type: Number, required: true},
  amount: {type: Number, required: true}
});

module.exports = mongoose.model('Bill', billSchema);
