const router = require('express').Router();

const { userMiddleware } = require('../middleware');

const { departmentController } = require('../controllers');

const { requestDataValidator } = require('../helpers');
const { department: { departmentCreateValidator } } = require('../validators');

const { userRoleEnum } = require('../config');

router.get(
  '/',
  [
    userMiddleware.findUserByToken,
    userMiddleware.hasUserAccess([
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
    userMiddleware.findUserByToken,
    userMiddleware.hasUserAccess([
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
    userMiddleware.findUserByToken,
    userMiddleware.hasUserAccess()
  ],
  departmentController.createDepartment
);

module.exports = router;
