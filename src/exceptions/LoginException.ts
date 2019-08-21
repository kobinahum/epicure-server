import { HttpException } from "./HttpException";
import { ExceptionTypesEnum } from "./ExceptionTypes.enum";
/**
 * Custom Exceptions that extend Http Exceptions
 */
export class LoginException extends HttpException {
	constructor() {
		super(400, `user not found`, ExceptionTypesEnum.Login_UserNotFound);
	}
}

