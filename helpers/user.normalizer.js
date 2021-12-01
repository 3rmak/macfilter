module.exports = {
  deletePrivateFields: (user) => {
    const fieldsToRemove = [
      'password',
      'isActive'
    ];
    user = user.toObject();

    fieldsToRemove.forEach((field) => {
      delete user[field];
    });

    return user;
  }
};
