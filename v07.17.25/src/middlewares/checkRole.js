// src/middlewares/checkRole.js
const checkRole = (rolPermitido) => {
    return (req, res, next) => {
        if (req.user && req.user.rol === rolPermitido) {
            return next();
        }
        return res.status(403).json({ mensaje: 'No tienes permiso para esta acción' });
    };
};

module.exports = checkRole;
// Este middleware verifica si el usuario tiene el rol permitido para acceder a una ruta específica.
// Se usa en las rutas protegidas para asegurar que solo los usuarios con el rol adecuado puedan acceder a ellas.