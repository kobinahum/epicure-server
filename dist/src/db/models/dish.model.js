"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
const genericFunctions_1 = require("../../generics/genericFunctions");
class DishMethods {
}
const DishSchema = ts_coverage_1.createStrongSchema({
    name: { type: String, unique: true, required: true, trim: true },
    category: { type: Number, required: true, min: 1, max: 4, validate: {
            validator: Number.isInteger,
            message: '{VALUE} categoy gets numbers between 1 to 4'
        } },
    ingredients: { type: [String], required: true },
    price: { type: Number, required: false, default: 0 },
    is_spicy: { type: Boolean, required: false, default: false },
    is_vegan: { type: Boolean, required: false, default: false },
    is_vegitarian: { type: Boolean, required: false, default: false },
    side_dish: { type: [String], required: false },
    changes: { type: [String], required: false },
    picture: { type: String, required: false }
}, new DishMethods(), { timestamps: true });
DishSchema.post('find', (doc) => {
    var obj = doc.map(genericFunctions_1.cleanObject);
    return obj;
});
DishSchema.methods.toJSON = function () {
    return genericFunctions_1.cleanObject(this.toObject());
};
exports.DishModel = mongoose_1.model('Dish', DishSchema);
//# sourceMappingURL=dish.model.js.map