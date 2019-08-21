"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class ForbiddenException extends HttpException_1.HttpException {
    constructor() {
        super(403, `Forbidden`, ExceptionTypes_enum_1.ExceptionTypesEnum.Forbidden);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=ForbiddenException.js.map