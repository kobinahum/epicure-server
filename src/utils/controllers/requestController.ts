import { Request, Response, Router, NextFunction } from 'express';
import { JWTController } from '../../utils/controllers/jwt.controller';
import {ForbiddenException, InvalidTokenException} from '../../exceptions';

class RequestController {

	/**
	 * Check received Headers and adds token value on locals
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 * @returns {Promise<void>}
	 * @throws { ForbiddenException , InvalidTokenException}
	 * @memberof RequestController
	 */
	public async headerValidation(req: Request, res: Response, next: NextFunction): Promise<void> {

		if (req.method == 'OPTIONS') {
			return next();
		}
		const authHeaderVal = req.headers.authorization;
		const token = JWTController.cleanReceivedToken(authHeaderVal);

		if (!token) {
			next(new ForbiddenException());
		} else {
			try {
				const decoded = await JWTController.verifyToken(token);
				res.locals.userId = ((decoded) as any).id;
				next();
			} catch (error) {
				next(new InvalidTokenException());
			}
		}
	}

}

export default RequestController;
