module.exports = function registerCrudRoutes(router, controller) {
    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findById);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
}