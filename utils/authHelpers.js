const jwt = require("jsonwebtoken");
const constantsConfig = require("../config/constants.config");

const createToken = (id) => {
    return jwt.sign({ id }, constantsConfig.JWT_SECRET, { expiresIn: constantsConfig.MAX_AGE });
}

const setAuthCookie = (res, token) => {
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: constantsConfig.MAX_AGE * 1000,
        // secure: true, // use in production with HTTPS
        sameSite: "Strict"
    });
};

module.exports = { createToken, setAuthCookie};
