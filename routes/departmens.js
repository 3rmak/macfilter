const { Router } = require("express");
const router = Router();
const passport = require('passport')
const DepartmentsController = require("../controllers/department");
const middlewareACL = require('../middleware/acl')
const cors = require("cors");

router.use(
  cors({
    origin: "*",
  })
);

router.get(
  "/api/departments",
  passport.authenticate("jwt", { session: false }),
  DepartmentsController.getAll
);

router.get(
  "/api/departments/:id",
  passport.authenticate("jwt", { session: false }),
  DepartmentsController.get
);

router.post(
  "/api/departments",
  [
    middlewareACL('admin'),
    passport.authenticate("jwt", { session: false })
  ],
  DepartmentsController.post
);

module.exports = router;
