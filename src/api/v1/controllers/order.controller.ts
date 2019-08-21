import { IOrder, OrderModel } from "../../../db/models/order.model";
import CrudController from '../../../generics/baseCrud.controller';
import { Request, Response, NextFunction, response } from "express";
import OrderHandler from '../handlers/order.handler';



class OrderController extends CrudController {

    protected initializeRoutes() {
        this.router.post('/', this.addToBag.bind(this)); //validationMiddleware(createResturantDTO),
        this.router.get('/myorder',this.myOrder.bind(this));
    }

    protected getSchema(): import("mongoose").Model<any, {}> {
        return OrderModel;
    }


    async addToBag(request: Request, response: Response, next: NextFunction) {
        const orderData: IOrder = request.body;
        const orderHandler = new OrderHandler();
        try {
			const chef = await orderHandler.addToBag(orderData);
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async myOrder(request: Request, response: Response, next: NextFunction){
        try{
            const orderHandler = new OrderHandler();
            const myOrder= await orderHandler.myOrder();
            return response.send(myOrder);
        } catch(error){
            return response.send(error);
        }
    }
}
export default OrderController;