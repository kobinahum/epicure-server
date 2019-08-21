"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../../db/models/order.model");
class OrderHAndler {
    async addToBag(orderData) {
        try {
            const order = await new order_model_1.OrderModel(orderData).save();
            return order;
        }
        catch (error) {
            return error;
        }
    }
    async myOrder() {
        try {
            const myOrder = await order_model_1.OrderModel.find({}, { quantity: 1, _id: 0 }).populate('resturant', { name: 1, _id: 0 }).populate('dishes', { name: 1, _id: 0, changes: 1, side_dish: 1, price: 1 });
            if (!myOrder)
                throw new Error();
            return myOrder;
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = OrderHAndler;
//# sourceMappingURL=order.handler.js.map