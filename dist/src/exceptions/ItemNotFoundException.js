"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
const ExceptionTypes_enum_1 = require("./ExceptionTypes.enum");
/**
 * Custom Exceptions that extend Http Exceptions
 */
class ItemNotFoundException extends HttpException_1.HttpException {
    constructor(id) {
        super(400, `Item with id ${id} not found`, ExceptionTypes_enum_1.ExceptionTypesEnum.ItemNotFound);
    }
}
exports.ItemNotFoundException = ItemNotFoundException;
//# sourceMappingURL=ItemNotFoundException.js.map