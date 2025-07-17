const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemAttributeValue = require("../controllers/stockItemAttributeValue.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemAttributeValue);

    // Add custom route(s) below
    router.get('/key/:stockItemId/:attributeId', stockItemAttributeValue.findByKey);
    router.post('/key/:stockItemId/:attributeId', stockItemAttributeValue.update);
    router.delete('/key/:stockItemId/:attributeId', stockItemAttributeValue.delete);

    app.use('/api/stockItemAttributeValue', router);
}