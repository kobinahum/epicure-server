"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dish_model_1 = require("../../../db/models/dish.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const dish_handler_1 = require("../handlers/dish.handler");
const dish_dto_1 = require("../dto/dish.dto");
const validation_middleware_1 = require("../../../middleware/validation.middleware");
class DishController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.post('/', validation_middleware_1.default(dish_dto_1.default), this.createDish.bind(this));
    }
    getSchema() {
        return dish_model_1.DishModel;
    }
    async createDish(request, response, next) {
        const dishData = request.body;
        const dishHandler = new dish_handler_1.default();
        try {
            const dish = await dishHandler.createDish(dishData);
            return response.send(dish);
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.default = DishController;
//# sourceMappingURL=dish.controller.js.map