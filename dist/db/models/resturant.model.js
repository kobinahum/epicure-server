"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require("validator");
const ts_coverage_1 = require("./../../utils/ts-coverage");
const genericFunctions_1 = require("../../generics/genericFunctions");
class ResturantMethods {
}
const ResturantSchema = ts_coverage_1.createStrongSchema({
    name: { type: String, required: true, trim: true },
    chef: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Chef', default: "5d594a92e5a8fb0752a5367d" },
    contact: {
        phone: { type: Number, required: false },
        email: { type: String, required: false, trim: true, lowercase: true, validate(value) {
                if (!validator.isEmail(value))
                    throw new Error("Invalid Email address..");
            } },
        address: { type: String, required: false, trim: true }
    },
    opening_date: { type: Date, default: Date.now() },
    opening_hours: { type: Date, default: new Date("1970-01-01T07:00:01.900Z") },
    closing_hours: { type: Date, default: new Date("1970-01-01T19:00:01.900Z") },
    cuisine: { type: String, required: true, trim: true },
    dishes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Dish' }],
    signature_dish: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Dish' },
    popular_score: { type: Number, min: 0, max: 5 },
    picture: { type: String }
}, new ResturantMethods(), { timestamps: true });
ResturantSchema.post('find', (doc) => {
    var obj = doc.map(genericFunctions_1.cleanObject);
    return obj;
});
ResturantSchema.methods.toJSON = function () {
    return genericFunctions_1.cleanObject(this.toObject());
};
exports.ResturantModel = mongoose_1.model('Resturant', ResturantSchema);
//# sourceMappingURL=resturant.model.js.map