"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class InvalidTokenException extends HttpException_1.HttpException {
    constructor() {
        super(401, `Invalid token`, ExceptionTypes_enum_1.ExceptionTypesEnum.InvalidToken);
    }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=InvalidTokenException.js.map