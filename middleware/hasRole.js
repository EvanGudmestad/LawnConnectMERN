/**
 * Middleware to check if the user has the required role to access a resource.
 * @param {string|string[]} allowedRoles}
 * @note This middleware assumes that req.user.role contains the user's role.
 * @note hasRole is a factory function because it needs to accept parameters.
 * @returns {function} Express middleware function
 */

export const hasRole = (allowedRoles) => {
  return (req, res, next) => {

    //Get the user roles
    const userRoles = req.user.role || [];

     if (!Array.isArray(userRoles) || userRoles.length === 0) {
      return res.status(403).json({ error: 'No roles assigned to user' });
    }
    // Convert allowedRoles to array if it's a string
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    //Check if the user has any of the allowed roles
    const hasAllowedRole = userRoles.some(role => rolesArray.includes(role));

    if(!hasAllowedRole){
      return res.status(403).json({
        error:`Access denied.  Required role(s): ${rolesArray.join(', ')}`
      })
    }
    next();
  }
};