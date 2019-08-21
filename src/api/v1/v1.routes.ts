import { Router, Request, Response, NextFunction } from 'express';
import UsersController from './controllers/users.controller';
import { LogController } from '../../utils/controllers/log.controller';
import RequestController from '../../utils/controllers/requestController';
import AuthController from './controllers/auth.controller';
import ResturantController from './controllers/resturant.controller';
import ChefController from './controllers/chef.controller';
import DishController from './controllers/dish.controller';
import OrderController from './controllers/order.controller';
import * as apidoc from '../../../apidoc';



class V1Routes {
	public router = Router();
	private requestController = new RequestController();


	constructor(){
		this.initializeRoutes();
	}

	private initializeRoutes() {

		const resurantController = new ResturantController();
		const chefController = new ChefController();
		const dishController = new DishController();
		const orderController = new OrderController();

		this.router.use('/resturant/', resurantController.router);
		this.router.use('/chef/', chefController.router);
		this.router.use('/dish/', dishController.router);
		this.router.use('/order/',orderController.router);
		this.router.get('/api/',apidoc);

		//this.router.all('*', this.requestController.headerValidation, this.logCreation.bind(this));

		

	}


	private async logCreation(req: Request, res: Response, next: NextFunction) {
		try {
			await LogController.createLog(req, res);
			next();
		} catch (error) {
			 next(error);
		}
	}

}


export default V1Routes;
