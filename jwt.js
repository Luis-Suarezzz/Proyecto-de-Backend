import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js"

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