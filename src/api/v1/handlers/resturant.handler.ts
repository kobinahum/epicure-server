import { IResturant, ResturantModel } from "../../../db/models/resturant.model";
import {IChef,ChefModel} from "../../../db/models/chef.model"
import { response } from "express";





class ResturantHandler{
    async createResturant(resturntData : IResturant ) {
        try {
			
			const res = await new ResturantModel(resturntData).save();
			
			return res;
            
        } catch (error) {
            return error;
        }
    }
    
    async getTop3Resturants(){
        try{
            const resturants = await ResturantModel.find({},{name:1,chef:1,popular_score:1}).sort({popular_score:-1}).limit(3).populate('chef',{name:1});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async getSigntureDishes(){
        try{
            const resturants = await ResturantModel.find({},{name:1}).sort({popular_score:-1}).skip(2).limit(3).populate('signature_dish',{name:1,picture:1,ingredients:1,is_spicy:1,is_vegan:1,is_vegitarian:1,price:1});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async getAllResturants(){
        try{
            const resturants = await ResturantModel.find({},{name:1,picture:1}).populate('chef',{name:1,_id:0});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async getNewResturants(){
        try{
            const resturants = await ResturantModel.find({},{name:1,picture:1}).sort({opening_date:1}).limit(3).populate('chef',{name:1});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async getPopularResturants(){
        try{
            const resturants = await ResturantModel.find({},{name:1,picture:1}).sort({popular_score:1}).limit(3).populate('chef',{name:1});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }
    
    async getCurrentlyOpenResturants(){
        let now=new Date().getHours();
    
        try{
            const resturants = await ResturantModel.aggregate([
                { 
                    "$redact": { 
                        "$cond": [
                            { 
                                "$and": [  
                                    { "$gte": [ { "$hour": "$closing_hours" }, now ] },
                                    { "$lt": [ { "$hour": "$opening_hours" }, now] }
                                ]
                            },
                            "$$KEEP",
                            "$$PRUNE"
                        ]
                    }
                }]);
            


            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async getResturantById(id:string){
        try{
            const resturant = await ResturantModel.findById(id);
            if(!resturant)
                throw new Error();
            return resturant;
        }catch(error){
            return error;
        
        }
    }

    async getResturantByName(name:string,index:number){
        try{
            const resturants = await ResturantModel.find({name},{name:1,picture:1,dishes:1}).limit(3*index).populate('chef',{name:1,_id:0}).populate('dishes',{name:1,ingredients:1,price:1,category:1}).sort({category:1});
            if(!resturants)
                throw new Error();
            return resturants;
        } catch(error){
            return error;
        }
    }

    async editResturantById(id:string,params:JSON){
        try{
        const resturant = await ResturantModel.findByIdAndUpdate(id,{$set:params});
        if(!resturant) throw new Error();
        return resturant;
        }catch(error){
            return error;
        }
    }
    
    async search(param:string){
        try{
            const resturant = await ResturantModel.find({$or:[{name:param},{cuisin:param}]});
            return resturant;
        } catch(error){
            return error;
        }
    }

}

export default ResturantHandler;