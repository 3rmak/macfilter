const { Router } = require('express');

const router = Router();

const { authController } = require('../controllers');

const { requestDataValidator } = require('../helpers');

const { authMiddleware, userMiddleware } = require('../middleware');

const { user: { userCreateValidator } } = require('../validators');

// /api/auth/register
router.post(
  '/register',
  [
    requestDataValidator(userCreateValidator),
    userMiddleware.userAccessListValidator,
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess()
  ], authController.register
);

// /api/auth/login
router.post(
  '/login', authController.login
);

module.exports = router;
