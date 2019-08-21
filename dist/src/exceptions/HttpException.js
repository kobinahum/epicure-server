"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, error_custom_code) {
        super(message);
        this.status = status;
        this.message = message;
        this.error_custom_code = error_custom_code;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map