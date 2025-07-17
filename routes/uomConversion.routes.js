const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const uomConversion = require("../controllers/uomConversion.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, uomConversion);

    // Add custom route(s) below
    router.get('/key/:fromId/:toId', uomConversion.findByKey);
    router.post('/key/:fromId/:toId', uomConversion.update);
    router.delete('/key/:fromId/:toId', uomConversion.delete);


    app.use('/api/uomConversion', router);
}