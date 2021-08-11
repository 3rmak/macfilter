const { Router } = require("express");
const DeviceController = require("../controllers/device");
const middlewareACL = require('../middleware/acl')
const passport = require("passport");
// const passportBasic = require("../middleware/passwordBasic")
const router = Router();
const cors = require("cors");


router.use(
  cors({
    origin: "*",
  })
);

router.get(
  "/api/devices",
  passport.authenticate("jwt", { session: false }),
  DeviceController.getAll
);

// GET by departmentID jwtStrategy
router.get(
  "/api/devices/:id",
  passport.authenticate("jwt", { session: false }),
  // passport.authenticate('basic', { session: false }),
  DeviceController.getFromDepartment
);

// GET by departmentID basicStrategy
router.get(
  "/api/devices/:id",
  // passport.authenticate("jwt", { session: false }),
  passport.authenticate('basic', { session: false }),
  DeviceController.getFromDepartment
);

// POST jwtStrategy
router.post(
  "/api/devices",
  [
    passport.authenticate("jwt", { session: false }),
    // passport.authenticate('basic', { session: false }),
  ],
  DeviceController.post
);

// POST basicStrategy
router.post(
  "/api/devices",
  [
    // passport.authenticate("jwt", { session: false }),
    passport.authenticate('basic', { session: false }),
  ],
  DeviceController.post
);

router.patch(
  "/api/devices",
  passport.authenticate("jwt", { session: false }),
  DeviceController.patch
);

router.delete(
  "/api/devices/",
  passport.authenticate("jwt", { session: false }),
  DeviceController.delete
);

module.exports = router;
