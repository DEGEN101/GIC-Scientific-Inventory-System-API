const database = require("../models");
const { createToken, setAuthCookie } = require("../utils/authHelpers");

const User = database.users;

module.exports = {
    signupPost: async (req, res) => {
        try {
            const result = await User.create(req.body);
            const token = createToken(result.UserID);
            setAuthCookie(res, token);

            res.status(201).json({ success: true, UserID: result.UserID });
        } catch (err) {
            console.error("[!] Signup error:", err.stack || err.message);
            res.status(500).json({
                success: false,
                message: "Signup failed",
                error: err.message
            });
        }
    },

    loginPost: async (req, res) => {
        try {
            const user = await User.login(req.body);
            const token = createToken(user.UserID);
            setAuthCookie(res, token);

            res.status(200).json({ success: true, UserID: user.UserID });
        } catch (err) {
            console.error("[!] Login error:", err.stack || err.message);
            res.status(401).json({
                success: false,
                message: "Login failed",
                error: err.message
            });
        }
    },

    logoutGet: async (req, res) => {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    },

    signupGet: async (req, res) => {
        res.send("signup");
    },

    loginGet: async (req, res) => {
        res.send("login");
    }
};
