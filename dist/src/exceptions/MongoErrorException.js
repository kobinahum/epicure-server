"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class MongoErrorException extends HttpException_1.HttpException {
    constructor() {
        super(400, `mongo error`, ExceptionTypes_enum_1.ExceptionTypesEnum.Mongo);
    }
}
exports.MongoErrorException = MongoErrorException;
//# sourceMappingURL=MongoErrorException.js.map