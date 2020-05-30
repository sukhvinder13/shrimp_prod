const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mysql = require("mysql");

const addFarmRoutes = require("./routes/addFarms")
const app = express();

// mongoose
//   .connect('mongodb://localhost:27017/shrimp',
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((err) => {
//     console.log("Connection failed!", err);
//   });
mongoose
  .connect('mongodb+srv://admin:admin@cluster0-8zipq.mongodb.net/shrimp?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!",err);
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
app.use("/", addFarmRoutes);

module.exports = app;
 // this is the main entry file, this need not be exported
// app.listen(3000,(err)=>{
//   if(err){
//     console.log('error occured while running server');
//   }else{
//     console.log('Server is running on port no 3000')
//   }
// })


