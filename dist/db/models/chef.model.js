"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
const genericFunctions_1 = require("../../generics/genericFunctions");
class ChefMethods {
}
const ChefSchema = ts_coverage_1.createStrongSchema({
    name: { type: String, unique: true, required: true, trim: true },
    resturants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Resturant' }],
    view_count: { type: Number, required: false, default: 0 },
    picture: { type: String, required: false },
    join_date: { type: Date, default: Date.now() }
}, new ChefMethods(), { timestamps: true });
ChefSchema.post('find', (doc) => {
    var obj = doc.map(genericFunctions_1.cleanObject);
    return obj;
});
ChefSchema.methods.toJSON = function () {
    return genericFunctions_1.cleanObject(this.toObject());
};
exports.ChefModel = mongoose_1.model('Chef', ChefSchema);
//# sourceMappingURL=chef.model.js.map