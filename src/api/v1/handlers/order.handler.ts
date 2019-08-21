import { IOrder, OrderModel } from "../../../db/models/order.model";




class OrderHAndler{

    async addToBag(orderData : IOrder ) {
        try {
			
			const order = await new OrderModel(orderData).save();
			
			return order;
            
        } catch (error) {
            return error;
        }
    }

    async myOrder(){
        try{
            const myOrder=await OrderModel.find({},{quantity:1,_id:0}).populate('resturant',{name:1,_id:0}).populate('dishes',{name:1,_id:0,changes:1,side_dish:1,price:1});
            if(!myOrder) throw new Error();
            return myOrder;
        } catch(error){
            return error;
        }
    }
}

export default OrderHAndler;