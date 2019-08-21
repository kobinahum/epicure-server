import { HttpException } from "./HttpException";
import { ExceptionTypesEnum } from "./ExceptionTypes.enum";
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class MongoErrorException extends HttpException {
	constructor() {
		super(400, `mongo error`, ExceptionTypesEnum.Mongo);
	}
}

