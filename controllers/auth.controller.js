const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const User = database.users;
const controller = createCrudController(User);

controller.loginGet = async (req, res) => {
    res.send("login");
};

controller.signupGet = async (req, res) => {
    res.send("new signup");
};

controller.loginPost = async (req, res) => {
    res.send("user login");
};

module.exports = controller;
