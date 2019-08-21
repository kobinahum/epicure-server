import { logModel } from '../../db/models/logs.model';
import { Request, Response, response } from 'express';
import { MongoErrorException } from '../../exceptions';

export class LogController {



	/**
	 * Gets relevant data from the request, creates a new log on db , saves the id on locals
	 *
	 * @param {string} logId
	 * @param {number} status
	 * @param {string} [error]
	 * @returns {void}
	 * @throws {MongoErrorException}
	 * @memberof LogController
	 */
	public static async createLog(req: Request, res: Response) {
		const user = res.locals.userId;
		const route = req.path;
		const http = req.method;
		const body = req.body ? JSON.stringify(req.body) : undefined;
		const query = req.query ? JSON.stringify(req.query) : undefined;

		const newLog = new logModel({
			user, route, http, body, query
		})

		try {
			const savedLog = await newLog.save();
			res.locals.logId = savedLog._id.toString();
			return;
		} catch (err) {
			throw new MongoErrorException();
		}
	}

	/**
	 * Set status and error to a existing log.
	 *
	 * @param {string} logId
	 * @param {number} status
	 * @param {string} [error]
	 * @returns {void}
	 * @throws {MongoErrorException}
	 * @memberof LogController
	 */
	public static async setStatusAndResponse(logId: string, status: number, error?: string, error_custom_code?: number) {
		const respError = error ? JSON.stringify(error) : undefined;
		try {
			await logModel.findOneAndUpdate({ _id: logId },
				{
					$set: {
						resp_status: status,
						error: respError,
						error_custom_code,
						hasError: true
					}
				});
			return;
		} catch (error) {
			throw new MongoErrorException();
		}
	}

}
