module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");

    const router = require("express").Router();

    // Route(s) below
    router.get("/", auth.findAll);
    router.post("/signup", auth.create);
    router.get("/signup", auth.signupGet);
    router.post("/login", auth.loginPost);
    router.get("/login", auth.loginGet);

    app.use('/auth/', router);
}