const jwt = require('jsonwebtoken');

const { jwtConfig, httpStatusCodes } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    createUserToken: (access_expires = jwtConfig.JWT_ACCESS_EXPIRES_IN) => {
        const token = jwt.sign(
            {},
            jwtConfig.JWT_ACCESS_SECRET,
            {expiresIn: access_expires}
        );

        return {
            token
        };
    },

    verifyUserToken: (token) => {
        try {
            const secret = jwtConfig.JWT_ACCESS_SECRET;

            jwt.verify(token, secret);
        } catch (error) {
            throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Invalid token');
        }
    },
};
