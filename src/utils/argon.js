// src/utils/argon.js
const argon2 = require('argon2');

const hashPassword = async (plainPassword) => {
    return await argon2.hash(plainPassword);
};

const verifyPassword = async (plainPassword, hashedPassword) => {
    return await argon2.verify(hashedPassword, plainPassword);
};

module.exports = { hashPassword, verifyPassword };
