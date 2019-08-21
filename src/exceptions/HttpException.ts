import { ExceptionTypesEnum } from "./ExceptionTypes.enum";

export class HttpException extends Error {
	status: number;
	message: string;
	error_custom_code: ExceptionTypesEnum;

	constructor(status: number, message: string, error_custom_code: ExceptionTypesEnum) {
		super(message);
		this.status = status;
		this.message = message;
		this.error_custom_code = error_custom_code
	}
}

