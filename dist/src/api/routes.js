"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_routes_1 = require("./v1/v1.routes");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const v1Routes = new v1_routes_1.default();
        this.router.use('/v1/', v1Routes.router);
    }
}
exports.default = ApiRoutes;
//# sourceMappingURL=routes.js.map