// src/utils/generarToken.js
const jwt = require('jsonwebtoken');

const generarToken = (payload) => {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

    return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generarToken;
