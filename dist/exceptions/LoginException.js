"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class LoginException extends HttpException_1.HttpException {
    constructor() {
        super(400, `user not found`, ExceptionTypes_enum_1.ExceptionTypesEnum.Login_UserNotFound);
    }
}
exports.LoginException = LoginException;
//# sourceMappingURL=LoginException.js.map