const { Router } = require("express");
const router = Router();
const UsersController = require('../controllers/users')
const passport = require('passport')
const cors = require("cors");

router.use(
  cors({
    origin: "*",
  })
);

router.get(
    '/api/users',
    passport.authenticate("jwt", { session: false }),
    UsersController.getAll
    )

module.exports = router