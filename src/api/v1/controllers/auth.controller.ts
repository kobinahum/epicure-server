import { Request, Response, NextFunction } from 'express';
import { AuthModel, IAuth } from '../../../db/models/auth.model';
import CrudController from '../../../generics/baseCrud.controller';
import validationMiddleware from '../../../middleware/validation.middleware';
import LoginDto from '../dto/auth/login.dto';
import AccessHandler from '../../../api/v1/handlers/access.handler';
import { JWTController } from '../../../utils/controllers/jwt.controller';

class AuthController extends CrudController {

    protected initializeRoutes() {
		this.router.post('/', validationMiddleware(LoginDto), this.login.bind(this));
		this.router.post('/forgot', this.forgotPassword.bind(this));
    }

    protected getSchema(): import("mongoose").Model<any, {}> {
        return AuthModel;
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const itemData: IAuth = request.body;
        const accessHandler = new AccessHandler();
        try {
			const user = await accessHandler.login(itemData.email.toLowerCase(), itemData.password)
			const token = JWTController.createToken(user._id.toString());
            return response.send({token, user})
        } catch (error) {
            next(error)
        }
	}

	async forgotPassword(request: Request, response: Response, next: NextFunction) {
		const email = request.body.email;
		const accessHandler = new AccessHandler();
		try {
			const auth = await accessHandler.forgotPassword(email);
			return response.send();
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
