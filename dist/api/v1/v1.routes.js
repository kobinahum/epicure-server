"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_controller_1 = require("../../utils/controllers/log.controller");
const requestController_1 = require("../../utils/controllers/requestController");
const resturant_controller_1 = require("./controllers/resturant.controller");
const chef_controller_1 = require("./controllers/chef.controller");
const dish_controller_1 = require("./controllers/dish.controller");
const order_controller_1 = require("./controllers/order.controller");
//import ApiDoc from '../../../apidoc';
class V1Routes {
    constructor() {
        this.router = express_1.Router();
        this.requestController = new requestController_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const resurantController = new resturant_controller_1.default();
        const chefController = new chef_controller_1.default();
        const dishController = new dish_controller_1.default();
        const orderController = new order_controller_1.default();
        this.router.use('/resturant/', resurantController.router);
        this.router.use('/chef/', chefController.router);
        this.router.use('/dish/', dishController.router);
        this.router.use('/order/', orderController.router);
        //this.router.use('/api/',express.Router.));
        //this.router.all('*', this.requestController.headerValidation, this.logCreation.bind(this));
    }
    async logCreation(req, res, next) {
        try {
            await log_controller_1.LogController.createLog(req, res);
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = V1Routes;
//# sourceMappingURL=v1.routes.js.map