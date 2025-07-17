const jwt = require("jsonwebtoken");
const config = require("../config/constants.config");

const requireAuth = (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ message: "[!] Authentication required" });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error("JWT verification failed:", err.message);
            return res.status(401).json({ message: "[!] Invalid or expired token" });
        }

        req.user = decodedToken;
        return next();
    });
};

const checkUser = (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error("JWT verification failed:", err.message);
            res.locals.user = null;
            return next(); // prevent fallthrough
        }

        res.locals.user = decodedToken;
        return next();
    });
};

module.exports = { requireAuth, checkUser };
