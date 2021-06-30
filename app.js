const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
//const exphbs  = require('express-handlebars');
const deviceRoutes = require("./routes/devices");
const departmentRoutes = require("./routes/departmens");
require("dotenv").config();

const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// app.set('views', 'views')
//
// app.get("/kramatorsk", (req, res) => {
//   res.render("kramatorsk")
// });

async function start() {
  try {
    await mongoose
      .connect(process.env.dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("MongoDB started successfully!");
      });

    app.use(deviceRoutes);
    app.use(departmentRoutes);


    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "index.html"));
    });

    app.get("/createDevice", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "createDevice.html"));
    });

    app.get("/kramatorsk", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "kramatorsk.html"));
    });

    app.get("/createDepartment", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "createDepartment.html"));
    });

    app.use(express.static(path.resolve(__dirname, "client")));

    app.listen(process.env.port, "0.0.0.0", () => {
      console.log("Server has been started ");
    });
  } catch (e) {
    console.log("Start error", e);
  }
}
start()