const httpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const config = require('config')

module.exports = function middlewareACL(...roles) {
    return async (req, res, next) => {
      try {
        const userToken = req.headers.authorization.substr(7)
        const jwt_payload  = jwt.decode(userToken)
        const user = await User.findById({_id: jwt_payload.userId})
        if (roles.includes(user.role)) {
          return next();
        }
  
        return res
          .status(httpStatus.FORBIDDEN)
          .json({
            message: 'У вас нет прав, чтобы выполнить это действие.'
          });
      } catch (error) {
        
      }
      
    };
  }
