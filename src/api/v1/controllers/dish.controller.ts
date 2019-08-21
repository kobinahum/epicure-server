import { IDish, DishModel } from "../../../db/models/dish.model";
import CrudController from '../../../generics/baseCrud.controller';
import { Request, Response, NextFunction } from "express";
import DishHandler from '../handlers/dish.handler';
import createDishDTO from '../dto/dish.dto';
import validationMiddleware from '../../../middleware/validation.middleware';



class DishController extends CrudController {

    protected initializeRoutes() {
        this.router.post('/',validationMiddleware(createDishDTO), this.createDish.bind(this));
    }

    protected getSchema(): import("mongoose").Model<any, {}> {
        return DishModel;
    }


    async createDish(request: Request, response: Response, next: NextFunction) {
        const dishData: IDish = request.body;
        const dishHandler = new DishHandler();
        try {
			const dish = await dishHandler.createDish(dishData);
            return response.send(dish);
        } catch (error) {
            response.send(error);
            
        }
    }

}

export default DishController;