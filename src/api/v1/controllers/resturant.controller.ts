import { IResturant, ResturantModel } from "../../../db/models/resturant.model";
import CrudController from '../../../generics/baseCrud.controller';
import { Request, Response, NextFunction, request } from "express";
import ResturantHandler from '../handlers/resturant.handler';
import { ItemNotFoundException } from "exceptions";
import validationMiddleware from '../../../middleware/validation.middleware';
import createResturantDTO from '../dto/resturant.dto';
import ChefHandler from '../handlers/chef.handler';
import DishHabdler from '../handlers/dish.handler';



class ResturantController extends CrudController {

    
    protected initializeRoutes() {
        this.router.post('/',validationMiddleware(createResturantDTO), this.createResturant.bind(this)); //validationMiddleware(createResturantDTO),
        this.router.get('/',this.getResturantByParam.bind(this));
        this.router.get('/search',this.search.bind(this));
        this.router.get('/top3',this.getTop3Resturants.bind(this));
        this.router.get('/singturedishs',this.getSigntureDishs.bind(this));
        this.router.get('/allrests',this.getAllResturants.bind(this));
        this.router.get('/newrests',this.getNewResturants.bind(this));
        this.router.get('/popularrests',this.getPopularResturants.bind(this));
        this.router.get('/openrests',this.getCurrentlyOpenResturants.bind(this));
        this.router.get('/resturantbyname',this.getResturantByName.bind(this));
        //this.router.get('/opennow',this.getCurrentlyOpenResturants.bind(this));
        this.router.put('/',this.editResturantById.bind(this));
    }

    protected getSchema(): import("mongoose").Model<any, {}> {
        return ResturantModel;
    }


    async createResturant(request: Request, response: Response, next: NextFunction) {
        const resturantData: IResturant = request.body;
        const resturantHandler = new ResturantHandler();
        try {
			const resturant = await resturantHandler.createResturant(resturantData);
            return response.send(resturant);
        } catch (error) {
            response.send(error);
            
        }
    }

    async getResturantByParam(request: Request, response: Response, next: NextFunction){
        
       
        if(request.query.id){
            await this.getResturantById(request,response,next,request.query.id);
        }
        else if(request.query.name) {
            await this.getResturantByName(request,response,next,request.query.name);
        }
        else{
            await this.getHomePage(request,response,next);
        }
       
    }

    async getResturantById(request: Request, response: Response, next: NextFunction, id:string){
        const resturantHandler=new ResturantHandler();
        try{
            const resturant = await resturantHandler.getResturantById(id);
            return response.send(resturant);

        } catch(error){
            return response.send(error);
        }
    }

    async getHomePage(request: Request, response: Response, next: NextFunction){
        const chefHandler=new ChefHandler();
        const resturantHandler=new ResturantHandler();
        
        Promise.all([resturantHandler.getTop3Resturants(),resturantHandler.getSigntureDishes(),chefHandler.chefOfTheWeek() ]).then(values=>{
            return response.send(values);
        }).catch(error=>{
            return response.send(error);
        });
    }

    async search(request: Request, response: Response, next: NextFunction){
        const chefHandler=new ChefHandler();
        const resturantHandler=new ResturantHandler();
        const dishHandler = new DishHabdler();

        const param=request.query.search;
        
        Promise.all([resturantHandler.search(param),dishHandler.search(param),chefHandler.search(param) ]).then(values=>{
            return response.send(values);
        }).catch(error=>{
            return response.send(error);
        });
    }

    async getTop3Resturants(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getTop3Resturants();

            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }

    async getSigntureDishs(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getSigntureDishes();
            
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }

    async getAllResturants(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getAllResturants();
            
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }

    async getNewResturants(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getNewResturants();
            
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }

    async getPopularResturants(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getPopularResturants();
            
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }

    async getCurrentlyOpenResturants(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        try{
            const resturants= await resturantHandler.getCurrentlyOpenResturants();
            
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }


    async getResturantByName(request: Request, response: Response, next: NextFunction,index=1){
        const resturantName=request.query.name;
        try{
            const resturants=await this.resturantPaging(resturantName,index);
            return response.send(resturants);
        } catch(error) {return response.send(error);}
        
    }
    //given resturant name, returning 6*index resturants
    async resturantPaging(resturantName:string,index=1){
        const resturantHandler=new ResturantHandler();
        const resturants= await resturantHandler.getResturantByName(resturantName,index);
        return resturants;
    }

    async editResturantById(request: Request, response: Response, next: NextFunction){
        const resturantHandler=new ResturantHandler();
        const id=request.query.id;
        const params =request.body;
        if(!id||!params) return;
        try{
            const updatedResturant= await resturantHandler.editResturantById(id,params);
            if(!updatedResturant) return response.send("Cannot find resturant, try diffrent ID").status(404);
            return response.send(updatedResturant);
        }catch(error){
            return response.send(error);
        }
    }

    
}

export default ResturantController;