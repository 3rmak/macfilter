const router = require('express').Router();

const { deviceController } = require('../controllers');

router.get(
  '/api/devices',
  deviceController.getAll
);

// GET by departmentID jwtStrategy
router.get(
  '/api/devices/:id',
  deviceController.getFromDepartment
);

// POST jwtStrategy
router.post(
  '/api/devices',
  deviceController.post
);

// // GET by departmentID basicStrategy
// router.get(
//   '/api/router/devices/:id',
//   deviceController.getFromDepartment
// );
//
// // POST basicStrategy
// router.post(
//   '/api/router/devices',
//   deviceController.post
// );

router.patch(
  '/api/devices',
  deviceController.patch
);

router.delete(
  '/api/devices/',
  deviceController.delete
);

module.exports = router;
