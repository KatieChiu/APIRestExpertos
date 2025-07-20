// src/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
};

module.exports = generateToken;
