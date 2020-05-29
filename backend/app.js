const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mysql =require("mysql");

const  addFarmRoutes = require("./routes/addFarms")
const app = express();
// mongoose
//   .connect('mongodb+srv://admin:admin@cluster0-8zipq.mongodb.net/shrimp?retryWrites=true&w=majority',
//   {useNewUrlParser: true, useUnifiedTopology: true}
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((err) => {
//     console.log("Connection failed!",err);
//   });
//Create connection
const conn = mysql.createConnection({
     host     : '160.153.94.101',
    port      :'3306',
    user      : 'shrimp',
    password  : 'shrimp@123',
    database  : 'shrimp_db',
  });
   
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/addFarm",addFarmRoutes);

module.exports = app;
