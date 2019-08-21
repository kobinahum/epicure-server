"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
class AuthMethods {
}
class ForgotPasswordMethods {
}
const forgotPasswordSchema = ts_coverage_1.createStrongSchema({
    tempPassword: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
}, new ForgotPasswordMethods(), { timestamps: true });
const AuthSchema = ts_coverage_1.createStrongSchema({
    email: { type: String,
        required: 'email is required',
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/ },
    password: { type: String },
    realPassword: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    forgotPassword: { type: forgotPasswordSchema },
    hasTemporaryPassword: { type: Boolean },
    status: { type: Number, default: 1 }
}, new AuthMethods(), { timestamps: true });
AuthSchema.set('toJSON', { transform: function (doc, ret, option) { return ret; } });
exports.AuthModel = mongoose_1.model('Auth', AuthSchema);
//# sourceMappingURL=auth.model.js.map