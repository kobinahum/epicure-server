"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
const genericFunctions_1 = require("../../generics/genericFunctions");
class UserMethods {
}
const UserSchema = ts_coverage_1.createStrongSchema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/
    },
    status: { type: Number, default: 1 }
}, new UserMethods(), { timestamps: true });
UserSchema.post('find', (doc) => {
    var obj = doc.map(genericFunctions_1.cleanObject);
    return obj;
});
UserSchema.methods.toJSON = function () {
    return genericFunctions_1.cleanObject(this.toObject());
};
exports.UserModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map