const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.user = user;
        next();
    });

    next();
};

module.exports = authRequired;