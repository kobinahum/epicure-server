"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../../db/models/order.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const order_handler_1 = require("../handlers/order.handler");
class OrderController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.post('/', this.addToBag.bind(this)); //validationMiddleware(createResturantDTO),
        this.router.get('/myorder', this.myOrder.bind(this));
    }
    getSchema() {
        return order_model_1.OrderModel;
    }
    async addToBag(request, response, next) {
        const orderData = request.body;
        const orderHandler = new order_handler_1.default();
        try {
            const chef = await orderHandler.addToBag(orderData);
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async myOrder(request, response, next) {
        try {
            const orderHandler = new order_handler_1.default();
            const myOrder = await orderHandler.myOrder();
            return response.send(myOrder);
        }
        catch (error) {
            return response.send(error);
        }
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map