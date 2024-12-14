module.exports = {
  validatePermissions: (requiredPermissions, grantedPermissions) => {
    return requiredPermissions.every((perm) =>
      grantedPermissions.includes(perm)
    );
  },
};
