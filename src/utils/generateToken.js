// src/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || jwtSecret.length < 32) {
        throw new Error("JWT_SECRET is missing or insecure. It must be at least 32 characters long.");
    }
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            rol: user.rol
        },
        jwtSecret,
        { expiresIn: '8h' }
    );
};

module.exports = generateToken;
