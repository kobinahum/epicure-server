"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
const genericFunctions_1 = require("../../generics/genericFunctions");
class OrderMethods {
}
const OrderSchema = ts_coverage_1.createStrongSchema({
    resturant: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Resturant' },
    dishes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Dish' }],
    quantity: { type: Number, default: 0 }
}, new OrderMethods(), { timestamps: true });
OrderSchema.post('find', (doc) => {
    var obj = doc.map(genericFunctions_1.cleanObject);
    return obj;
});
OrderSchema.methods.toJSON = function () {
    return genericFunctions_1.cleanObject(this.toObject());
};
exports.OrderModel = mongoose_1.model('Order', OrderSchema);
//# sourceMappingURL=order.model.js.map