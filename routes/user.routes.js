const { Router } = require('express');

const router = Router();

const { userController } = require('../controllers');

router.get(
  '/api/users',
  [
  ],
  userController.getAll
);

router.patch(
  '/api/users',
  [
  ],
  userController.patch
);

module.exports = router;
