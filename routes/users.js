const { Router } = require("express");
const router = Router();
const UsersController = require('../controllers/users')
const middlewareACL = require('../middleware/acl')
const passport = require('passport')
const cors = require("cors");

router.use(
  cors({
    origin: "*",
  })
);

router.get(
    '/api/users',
    [
      middlewareACL('admin'),
      passport.authenticate("jwt", { session: false }),
    ],
    UsersController.getAll
    )
router.patch(
  '/api/users',
  [
    middlewareACL('admin'),
    passport.authenticate("jwt", { session: false }),
  ],
  UsersController.patch
  )

module.exports = router