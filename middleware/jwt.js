const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function createToken(payload) {
    const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 2000); // 20 minutes
    const accessToken = jwt.sign(
        {
            exp: Math.floor(expirationTime / 1000),
            data: payload,
        },
        TOKEN_SECRET
    );
    return accessToken;
}

module.exports = { createToken };
