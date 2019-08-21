"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ts_coverage_1 = require("./../../utils/ts-coverage");
class LogMethods {
}
const LogSchema = ts_coverage_1.createStrongSchema({
    route: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    query: { type: String },
    http: { type: String },
    body: { type: String },
    hasError: { type: Boolean, default: false },
    resp_status: { type: Number },
    error_custom_code: { type: Number },
    error: { type: String },
}, new LogMethods(), { timestamps: true });
LogSchema.set('toJSON', { transform: function (doc, ret, option) { return ret; } });
exports.logModel = mongoose_1.model('log', LogSchema);
//# sourceMappingURL=logs.model.js.map