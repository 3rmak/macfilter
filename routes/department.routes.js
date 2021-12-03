const router = require('express').Router();

const { authMiddleware, departmentMiddleware } = require('../middleware');

const { departmentController } = require('../controllers');

const { requestDataValidator } = require('../helpers');
const { department: { departmentCreateValidator } } = require('../validators');

const { userRoleEnum } = require('../config');

router.get(
  '/',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess([
      userRoleEnum.ADMIN,
      userRoleEnum.NACH_ROP,
      userRoleEnum.REGIONAL
    ])
  ],
  departmentController.getAllDepartments
);

router.get(
  '/:departmentId',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess([
      userRoleEnum.ADMIN,
      userRoleEnum.NACH_ROP,
      userRoleEnum.REGIONAL
    ])
  ],
  departmentController.getDepartmentById
);

router.post(
  '/',
  [
    requestDataValidator(departmentCreateValidator),
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess(),
    departmentMiddleware.userIdListValidator
  ],
  departmentController.createDepartment
);

// currently not working because of transactions
router.delete(
  '/:departmentId',
  [
    authMiddleware.findUserByToken,
    authMiddleware.hasUserRoleAccess()
  ],
  departmentController.removeDepartmentById
);

module.exports = router;
