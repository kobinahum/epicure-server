"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../exceptions");
/**
 *  Receives A DTO and Validates if the data exist
 *
 * @template T
 * @param {*} type
 * @param {boolean} [skipMissingProperties=false]
 * @returns {express.RequestHandler}
 */
function validationMiddleware(type, skipMissingProperties = false, isQuery = false) {
    return (req, res, next) => {
        const objectToValidate = isQuery ? req.query : req.body;
        class_validator_1.validate(class_transformer_1.plainToClass(type, objectToValidate), { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                const message = getMessageFromErrors(errors);
                next(new exceptions_1.ValidationException(message));
            }
            else {
                next();
            }
        });
    };
}
function getMessageFromErrors(errors) {
    const messages = errors.map((error) => {
        if (error.constraints) {
            return Object.values(error.constraints);
        }
        else if (error.children && error.children.length > 0) {
            return getMessageFromErrors(error.children);
        }
        else {
            return 'not found error on middleware';
        }
    });
    return messages.join(', ');
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map