const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const purchaseOrderDetails = require("../controllers/purchaseOrderDetails.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, purchaseOrderDetails);

    // Add custom route(s) below
    router.get('/key/:poid/:stockItemId', purchaseOrderDetails.findByKey);
    router.post('/key/:poid/:stockItemId', purchaseOrderDetails.update);
    router.delete('/key/:poid/:stockItemId', purchaseOrderDetails.delete);

    app.use('/api/purchaseOrderDetails', router);
}