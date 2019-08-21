import { IDish, DishModel } from "../../../db/models/dish.model";




class DishHandler{
    async createDish(dishData : IDish ) {
        try {
			
			const dish = await new DishModel(dishData).save();
			
			return dish;
            
        } catch (error) {
            return error;
        }
    }
    
    async search(param:string){
        try {
			const dish = await DishModel.find({name:param});
			return dish;
        } catch (error) {
            return error;
        }
    }
}

export default DishHandler;