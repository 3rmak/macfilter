const router = require('express').Router();

const { authMiddleware } = require('../middleware');

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
    authMiddleware.hasUserRoleAccess()
  ],
  departmentController.createDepartment
);

module.exports = router;
