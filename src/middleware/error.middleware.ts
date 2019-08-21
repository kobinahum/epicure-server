import { NextFunction, Request, Response } from 'express';
import { LogController } from '../utils/controllers/log.controller';
import { ExceptionTypesEnum, HttpException } from '../exceptions';


async function  errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong';
	const error_custom_code = error.error_custom_code || ExceptionTypesEnum.Unknown;
	try {
		await LogController.setStatusAndResponse(response.locals.logId, status, message, error_custom_code);
		response
			.status(status)
			.send({
				status,
				error_custom_code,
				logId: response.locals.logId
			})
	} catch(err){
		response.status(err.status).send(err);
	}

}

export default errorMiddleware;
