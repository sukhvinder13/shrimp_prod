// var express = require('express')
// var bodyParser = require('body-parser')
// var cors = require('cors')
// var mongoose = require('mongoose')
// var app = express()
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
 
// var AddFarm = require('./backend/models/addFarm.js')
 
// app.use(cors())
 
// mongoose
//   .connect('mongodb+srv://admin:admin@cluster0-8zipq.mongodb.net/shrimp?retryWrites=true&w=majority',
//   {useNewUrlParser: true, useUnifiedTopology: true}
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((err) => {
//     console.log("Connection failed!");
//     console.log(err);
//   });

// app.get('/addFarm', async (req, res) => {
//     var getFarm = await AddFarm.find({});
//     res.send(getFarm);
// })
 
// app.post('/addFarm', (req, res) => {
//     var AddFarmData = req.body;
//     var addFarm = new AddFarm(AddFarmData);
 
//     addFarm.save((err, result) => {
//         if (err) {
//             console.log("error saving farm.")
//         }
 
//         res.sendStatus(200);
//     })
// })
 
// mongoose.connect('mongodb+srv://admin:<admin>@cluster0-8zipq.mongodb.net/shrimp?retryWrites=true&w=majority')
 
// app.listen(3000)
// app.listen(process.event.PORT || 3000);
// Begins
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
