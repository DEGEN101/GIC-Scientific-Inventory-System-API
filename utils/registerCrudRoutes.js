module.exports = function registerCrudRoutes(router, controller, protect = {}) {
    const { requireAuth } = require("../middleware/auth.middleware");

    const protectOr = (routeFn, middleware, handler) =>
        middleware ? [middleware, handler] : [handler];

    router.post("/", ...protectOr("post", protect.create ? requireAuth : null, controller.create));
    router.get("/", ...protectOr("get", protect.findAll ? requireAuth : null, controller.findAll));
    router.get("/:id", ...protectOr("getOne", protect.findById ? requireAuth : null, controller.findById));
    router.put("/:id", ...protectOr("put", protect.update ? requireAuth : null, controller.update));
    router.delete("/:id", ...protectOr("delete", protect.delete ? requireAuth : null, controller.delete));
};
