import { IChef, ChefModel } from "../../../db/models/chef.model";
import CrudController from '../../../generics/baseCrud.controller';
import { Request, Response, NextFunction } from "express";
import ChefHandler from '../handlers/chef.handler';
import validationMiddleware from '../../../middleware/validation.middleware';
import createChefDTO from '../dto/chef.dto';



class ChefController extends CrudController {

    protected initializeRoutes() {
        this.router.post('/',validationMiddleware(createChefDTO), this.createChef.bind(this)); //
        this.router.get('/chefoftheweek',this.chefOfTheWeek.bind(this));
        this.router.get('/allchefs',this.allChefs.bind(this));
        this.router.get('/newchefs',this.newChefs.bind(this));
        this.router.get('/popularchefs',this.popularChefs.bind(this));
        this.router.get('/resturantsbyid',this.getChefResturants.bind(this));
    }

    protected getSchema(): import("mongoose").Model<any, {}> {
        return ChefModel;
    }


    async createChef(request: Request, response: Response, next: NextFunction) {
        const chefData: IChef = request.body;
        const chefHandler = new ChefHandler();
        try {
			const chef = await chefHandler.createChef(chefData);
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async chefOfTheWeek(request: Request, response: Response, next: NextFunction) {
        const chefHandler = new ChefHandler();
        try {
			const chef = await chefHandler.chefOfTheWeek();
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async allChefs(request: Request, response: Response, next: NextFunction) {
        const chefHandler = new ChefHandler();
        try {
			const chef = await chefHandler.allChefs();
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async newChefs(request: Request, response: Response, next: NextFunction) {
        const chefHandler = new ChefHandler();
        try {
			const chef = await chefHandler.newChefs();
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async popularChefs(request: Request, response: Response, next: NextFunction) {
        const chefHandler = new ChefHandler();
        try {
			const chef = await chefHandler.popularChefs();
            return response.send(chef);
        } catch (error) {
            response.send(error);
            
        }
    }

    async getChefResturants(request: Request, response: Response, next: NextFunction){
        const id=request.query.id;
        if(!id) return response.send("Not Found").status(404);
        const chefHandler = new ChefHandler();
        try{
        const chef = await chefHandler.getChefResturants(id);
        return response.send(chef);
        }catch(error){
            return response.send(error);
        }

    }

}

export default ChefController;