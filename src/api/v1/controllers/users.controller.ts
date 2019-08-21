import { Request, Response, NextFunction } from 'express';
import { UserModel, IUser } from '../../../db/models/user.model';
import CrudController from '../../../generics/baseCrud.controller';
import validationMiddleware from '../../../middleware/validation.middleware';
import RegisterUserDto from '../dto/auth/register.dto';
import { IRegister } from 'db/models/auth.model';
import AccessHandler from '../handlers/access.handler';
import UserHandler from '../handlers/user.handler';
import { PaginationModel } from '../../../utils/models/pagination.model';
import { UserQuery } from '../models/query/user.query';


class UsersController extends CrudController {

	protected initializeRoutes() {
		this.router.get('/', this.getUsersWithPagination.bind(this));
		this.router.get('/minimize', this.getUsersMinimize.bind(this))
		this.router.get('/profile', this.getUserProfile.bind(this))
		this.router.post('/register', validationMiddleware(RegisterUserDto), this.registerNewUser.bind(this));
		this.router.post('/email', this.checkIfEmailExist.bind(this))
		this.router.put('/', this.update.bind(this));
		this.router.delete('/', this.delete.bind(this));
	}

	protected getSchema(): import("mongoose").Model<any, {}> {
		return UserModel;
	}

	async registerNewUser(request: Request, response: Response, next: NextFunction) {
		const itemData: IRegister = request.body;
		const accessHandler = new AccessHandler();
		try {
			const user = await accessHandler.register(itemData.email, 'Aa123456', itemData.firstName, itemData.lastName, itemData.phone, itemData.role, itemData.department)
			return response.send(user)
		} catch (error) {
			next(error)
		}
	}

	async checkIfEmailExist(request: Request, response: Response, next: NextFunction) {
		const email = request.body.email;
		const usersHandler = new UserHandler();
		try {
			const user = await usersHandler.findUserByEmail(email);
			if (!user) {
				return response.send({ exist: false })
			}
			return response.send({ exist: true })
		} catch (error) {
			next(error)
		}
	}

	async getUsersWithPagination(request: Request, response: Response, next: NextFunction) {
		const usersHandler = new UserHandler();

		const userQuery: UserQuery = new UserQuery(request.query);
		const mongooseQuery = userQuery.mongooseQueryCreator();

		try {
			const paginationData: PaginationModel<IUser> = await usersHandler.getUsersWithPagination(mongooseQuery);
			response.send(paginationData);

		} catch (error) {
			next(error);
		}
	}

	async getUserProfile(request: Request, response: Response, next: NextFunction) {
		const usersHandler = new UserHandler();
		const id = response.locals.userId;
		try {
			const user: IUser = await usersHandler.getUserProfile(id);
			response.send(user);

		} catch (error) {
			next(error);
		}
	}


	async getUsersMinimize(request: Request, response: Response, next: NextFunction) {
		const usersHandler = new UserHandler();

		try {
			const users: IUser[] = await usersHandler.getUsersDataMinimize();
			response.send(users);

		} catch (error) {
			next(error);
		}
	}
}

export default UsersController;
