import { getDatabase } from "../database.js";

/**
 * Middleware to check if user has required permission
 * @param {string} permission - The required permission
 */

export const hasPermission = (permission) => {
  return async (req, res, next) => {
     try {
        //Get user roles
        const userRoles = req.user.role || [];
        
        if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'No roles assigned to user' });
        }
        //Get database instance
        const db = await getDatabase();

        const roleDocuments = await db.collection('role').find({ role: { $in: userRoles } }).toArray();
        
        console.log(`User roles: ${userRoles}`);
        console.log('Role documents from DB:', roleDocuments);

        // Check if any of the user's roles has the required permission
          const hasRequiredPermission = roleDocuments.some(roleDoc => {
          return roleDoc.permissions && roleDoc.permissions[permission] === true;
        });

            if (!hasRequiredPermission) {
          return res.status(403).json({ 
            error: `Permission denied. Required permission: ${permission}` 
          });
      }

      next();
     }
     catch (error) {
         console.error('Permission check error:', error);
      return res.status(500).json({ error: 'Error checking permissions' });
     }
  }
};

/**
 * Middleware to check if user has at least one of the required permissions (OR logic)
 * @param {string[]} permissions - Array of permissions to check
 * @example hasAnyPermission(['canCreateJob', 'canEditJob'])
 */
export const hasAnyPermission = (permissions) => {
  return async (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Get user roles
      const userRoles = req.user.role || [];
      
      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'No roles assigned to user' });
      }

      // Get database
      const db = await getDatabase();
      const rolesCollection = db.collection('role');

      // Fetch all role documents for user's roles
      const roleDocuments = await rolesCollection
        .find({ role: { $in: userRoles } })
        .toArray();

      // Check if any of the user's roles has any of the required permissions
      const hasRequiredPermission = roleDocuments.some(roleDoc => {
        if (!roleDoc.permissions) return false;
        
        // Check if any of the specified permissions is true
        return permissions.some(permission => roleDoc.permissions[permission] === true);
      });

      if (!hasRequiredPermission) {
        return res.status(403).json({ 
          error: `Permission denied. Required permission (any of): ${permissions.join(', ')}` 
        });
      }

      // User has at least one permission, continue to next middleware
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({ error: 'Error checking permissions' });
    }
  };
};

/**
 * Middleware to check if user has all of the required permissions (AND logic)
 * @param {string[]} permissions - Array of permissions to check
 * @example hasAllPermissions(['canCreateJob', 'canEditJob'])
 */
export const hasAllPermissions = (permissions) => {
  return async (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Get user roles
      const userRoles = req.user.role || [];
      
      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(403).json({ error: 'No roles assigned to user' });
      }

      // Get database
      const db = await getDatabase();
      const rolesCollection = db.collection('role');

      // Fetch all role documents for user's roles
      const roleDocuments = await rolesCollection
        .find({ role: { $in: userRoles } })
        .toArray();

      // Collect all permissions the user has across all roles
      const userPermissions = new Set();
      roleDocuments.forEach(roleDoc => {
        if (roleDoc.permissions) {
          Object.entries(roleDoc.permissions).forEach(([permission, value]) => {
            if (value === true) {
              userPermissions.add(permission);
            }
          });
        }
      });

      // Check if user has all required permissions
      const hasAllRequired = permissions.every(permission => 
        userPermissions.has(permission)
      );

      if (!hasAllRequired) {
        const missingPermissions = permissions.filter(p => !userPermissions.has(p));
        return res.status(403).json({ 
          error: `Permission denied. Missing permissions: ${missingPermissions.join(', ')}` 
        });
      }

      // User has all permissions, continue to next middleware
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({ error: 'Error checking permissions' });
    }
  };
};