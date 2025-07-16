const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
