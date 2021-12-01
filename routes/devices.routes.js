const router = require('express').Router();

const { deviceController } = require('../controllers');

const { authMiddleware, deviceMiddleware } = require('../middleware');

const { requestDataValidator } = require('../helpers');
const { device: { createDeviceValidator, patchSingleDeviceValidator, patchMultipleDeviceValidator } } = require('../validators');

const { userRoleEnum } = require('../config');

router.get(
  '/',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP)
  ],
  deviceController.getAll
);

// GET by jwtStrategy
router.get(
  '/:deviceId',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP)
  ],
  deviceController.getDeviceById
);

// POST jwtStrategy
router.post(
  '/',
  [
    requestDataValidator(createDeviceValidator),
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP),
    deviceMiddleware.hasUserDepartmentAccess(),
    deviceMiddleware.isMacUnique
  ],
  deviceController.post
);

// change only allowed param to each device
router.patch(
  '/multiple',
  [
    requestDataValidator(patchMultipleDeviceValidator),
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP),
    deviceMiddleware.hasUserDepartmentAccess('multiple'),
  ],
  deviceController.patchDevicesAllowedParam
);

router.patch(
  '/:deviceId',
  [
    requestDataValidator(patchSingleDeviceValidator),
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP),
    deviceMiddleware.hasUserDepartmentAccess(),
  ],
  deviceController.patchSingleDevice
);

router.delete(
  '/:deviceId',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(userRoleEnum.ADMIN, userRoleEnum.REGIONAL, userRoleEnum.NACH_ROP),
  ],
  deviceController.delete
);

// // GET by basicStrategy
// router.get(
//   '/api/router/devices/:id',
//   deviceController.getDeviceById
// );
//
// // POST basicStrategy
// router.post(
//   '/api/router/devices',
//   deviceController.post
// );

module.exports = router;
