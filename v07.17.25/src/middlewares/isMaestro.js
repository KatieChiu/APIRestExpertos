module.exports = (req, res, next) => {
    if (!req.user || req.user.username !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Solo el usuario maestro puede registrar.' });
    }
    next();
};
