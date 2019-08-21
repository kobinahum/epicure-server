import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { ValidationException } from '../exceptions';

/**
 *  Receives A DTO and Validates if the data exist
 *
 * @template T
 * @param {*} type
 * @param {boolean} [skipMissingProperties=false]
 * @returns {express.RequestHandler}
 */
function validationMiddleware<T>(type: any, skipMissingProperties = false, isQuery = false): express.RequestHandler {
	return (req, res, next) => {
		const objectToValidate = isQuery ? req.query : req.body;
		validate(plainToClass(type, objectToValidate), { skipMissingProperties })
			.then((errors: ValidationError[]) => {
				if (errors.length > 0) {
					const message = getMessageFromErrors(errors);
					next(new ValidationException(message));
				} else {
					next();
				}
			});
	};
}


function getMessageFromErrors(errors: ValidationError[]): string{
	const messages = errors.map((error: ValidationError) => {

		if(error.constraints){
			return Object.values(error.constraints)
		} else if(error.children && error.children.length > 0){
			return getMessageFromErrors(error.children);
		} else {
			return 'not found error on middleware';
		}
	});
	return messages.join(', ');
}


export default validationMiddleware;
