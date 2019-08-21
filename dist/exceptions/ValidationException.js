"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class ValidationException extends HttpException_1.HttpException {
    constructor(message) {
        super(400, message, ExceptionTypes_enum_1.ExceptionTypesEnum.Validation);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map