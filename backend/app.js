// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongoose');

// const postsRoutes = require("./routes/posts");



const billRoutes = require('./routes/bills');

const supplierRoutes = require('./routes/suppliers');

const userRoutes = require("./routes/user");
///const userRoutes = require('./routes/user');

const app = express();

mongoClient.connect('mongodb://localhost:27017/osrp')
.then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/images", express.static(path.join("backend/images")));
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

app.use("/api/user", userRoutes);
app.use("/api/bills", billRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/user", userRoutes);
//app.use("/api/user", userRoutes);


module.exports = app;

