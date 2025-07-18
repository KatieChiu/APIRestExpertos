<<<<<<< Updated upstream
// src/utils/generarToken.js
const jwt = require('jsonwebtoken');

const generarToken = (payload) => {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

    return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generarToken;
=======
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
>>>>>>> Stashed changes
