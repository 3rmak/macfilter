const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport')
//const path = require("path");
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const deviceRoutes = require("./routes/devices");
const departmentRoutes = require("./routes/departmens");
const config = require('config')
require("dotenv").config();

const app = express();
const PORT = config.get('port')

async function start() {
  try {
    await mongoose
      .connect(config.get('mongoUri'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Connection to MongoDB successfully!");
      });


    app.use(passport.initialize())
    require('./middleware/passport')(passport)

    app.use(express.json({ extended: true }))
    app.use(deviceRoutes);
    app.use(departmentRoutes);
    app.use(authRoutes)
    app.use(cors())
  

    // app.get("/", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "public", "index.html"));
    // });

    // app.get("/createDevice", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "public", "createDevice.html"));
    // });

    // app.get("/kramatorsk", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "public", "kramatorsk.html"));
    // });

    // app.get("/createDepartment", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "public", "createDepartment.html"));
    // });

    // app.use(express.static(path.resolve(__dirname, "public")));

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server has been started on port ${PORT} `);
    });
  } catch (e) {
    console.log("Start error", e);
  }
}
start()