"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_controller_1 = require("../utils/controllers/log.controller");
const exceptions_1 = require("../exceptions");
async function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const error_custom_code = error.error_custom_code || exceptions_1.ExceptionTypesEnum.Unknown;
    try {
        await log_controller_1.LogController.setStatusAndResponse(response.locals.logId, status, message, error_custom_code);
        response
            .status(status)
            .send({
            status,
            error_custom_code,
            logId: response.locals.logId
        });
    }
    catch (err) {
        response.status(err.status).send(err);
    }
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map