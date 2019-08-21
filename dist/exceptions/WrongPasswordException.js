"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class WrongPasswordException extends HttpException_1.HttpException {
    constructor() {
        super(400, `wrong password`, ExceptionTypes_enum_1.ExceptionTypesEnum.WrongPassword);
    }
}
exports.WrongPasswordException = WrongPasswordException;
//# sourceMappingURL=WrongPasswordException.js.map