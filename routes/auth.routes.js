const { requireAuth } = require("../middleware/auth.middleware.js");

module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");

    const router = require("express").Router();

    // Route(s) below
    router.post("/signup", auth.signupPost);
    router.get("/signup", auth.signupGet);
    router.post("/login", auth.loginPost);
    router.get("/login", auth.loginGet);
    router.get("/logout", auth.logoutGet);

    app.use('/auth/', router);
}