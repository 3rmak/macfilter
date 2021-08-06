const { Router } = require("express");
const DeviceController = require("../controllers/device");
const middlewareACL = require('../middleware/acl')
const passport = require("passport");
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

router.get(
  "/api/devices/:id",
  passport.authenticate("jwt", { session: false }),
  DeviceController.getFromDepartment
);

router.post(
  "/api/devices",
  [
    middlewareACL('admin'),
    passport.authenticate("jwt", { session: false }),
  ],
  DeviceController.post
);

router.patch(
  "/api/devices",
  passport.authenticate("jwt", { session: false }),
  DeviceController.patch
);

module.exports = router;
