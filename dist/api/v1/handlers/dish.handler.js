"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dish_model_1 = require("../../../db/models/dish.model");
class DishHandler {
    async createDish(dishData) {
        try {
            const dish = await new dish_model_1.DishModel(dishData).save();
            return dish;
        }
        catch (error) {
            return error;
        }
    }
    async search(param) {
        try {
            const dish = await dish_model_1.DishModel.find({ name: param });
            return dish;
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = DishHandler;
//# sourceMappingURL=dish.handler.js.map