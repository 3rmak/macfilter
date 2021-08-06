const httpStatus = require('http-status-codes')

module.exports = function middlewareACL(...roles) {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        return next();
      }
  
      return res
        .status(httpStatus.FORBIDDEN)
        .json({
          message: 'You have not permission to access.'
        });
    };
  }
