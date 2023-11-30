const jwt = require("jsonwebtoken");
require('dotenv').config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export default function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "99d",
            }, (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        );
    })
}