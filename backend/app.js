const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongoose');

const supplierRoutes = require('./routes/suppliers');

const userRoutes = require("./routes/user");

const productRoutes = require("./routes/products");

const billRoutes = require('./routes/bills');

const app = express();

mongoClient.connect(
  "mongodb+srv://bhaskar:"+ process.env.MONGO_ATLAS_PW +"@cluster0-3wshx.mongodb.net/osrp"
 ).then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed');
});

// mongoClient.connect('mongodb://localhost:27017/osrp')
// .then(() => {
//   console.log('Connected to database');
// })
// .catch(() => {
//   console.log('Connection failed')
// });

//pB1KYgI1yUePdQ16

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// RO02mtoMosBnYJq7

// app.use("/api/posts", postsRoutes);

//app.use("/api/user", userRoutes);
app.use("/api/bills", billRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/user", userRoutes);
//app.use("/api/user", userRoutes);

app.use("/api/products", productRoutes);

module.exports = app;

