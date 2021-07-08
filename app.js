const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');
//const exphbs  = require('express-handlebars');
const deviceRoutes = require("./routes/devices");
const departmentRoutes = require("./routes/departmens");
require("dotenv").config();

const app = express();

async function start() {
  try {
    await mongoose
      .connect(process.env.dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Connection to MongoDB successfully!");
      });

    app.use(deviceRoutes);
    app.use(departmentRoutes);
    app.use(cors())

    app.use(express.json({ extended: true }))
    app.use('/api/auth', require('./routes/auth.routes'))

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });

    app.get("/createDevice", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "createDevice.html"));
    });

    app.get("/kramatorsk", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "kramatorsk.html"));
    });

    app.get("/createDepartment", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "createDepartment.html"));
    });

    app.use(express.static(path.resolve(__dirname, "public")));

    app.listen(process.env.port, "0.0.0.0", () => {
      console.log("Server has been started ");
    });
  } catch (e) {
    console.log("Start error", e);
  }
}
start()