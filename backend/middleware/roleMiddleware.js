// roleMiddleware.js
// roleMiddleware.js
const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        // Fix: Convert user role to lowercase to handle mismatched cases safely
        const currentRole = req.user.role ? req.user.role.toLowerCase() : '';

        // Fix: Convert the required roles to lowercase just in case
        const allowedRoles = roles.map(r => r.toLowerCase());

        if (!allowedRoles.includes(currentRole)) {
            return res.status(403).json({
                message: `Access denied. Requires one of: ${roles.join(', ')}`
            });
        }
        next();
    };
};
module.exports = roleMiddleware;