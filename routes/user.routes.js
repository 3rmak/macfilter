const { Router } = require('express');

const router = Router();

const { userController } = require('../controllers');

const { authMiddleware, userMiddleware } = require('../middleware');

const { requestDataValidator } = require('../helpers');
const { user: { userPatchValidator } } = require('../validators');

router.get(
  '/',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess()
  ],
  userController.getAll
);

router.patch(
  '/:userId',
  [
    requestDataValidator(userPatchValidator),
    userMiddleware.userAccessListValidator,
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess()
  ],
  userController.patch
);

module.exports = router;
