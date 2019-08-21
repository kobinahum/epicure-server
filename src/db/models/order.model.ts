import { model, Document, Schema, NativeError } from "mongoose";
import * as validator from 'validator';
import * as mongooseExtensions from "types/mongoose";
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';

import { DocumentStatusEnum } from "../../types/documentStatus.enum";
import { cleanObject } from "../../generics/genericFunctions";
import { Double } from "bson";
import {IResturantModel} from '../models/resturant.model';
import { IDishModel } from "./dish.model";

export interface IOrder extends ISchema {
	resturant: Schema.Types.ObjectId|IResturantModel;
	dishes: Schema.Types.Array|IDishModel;
	quantity:number;
}

class OrderMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const OrderSchema = createStrongSchema(({
	resturant: { type: Schema.Types.ObjectId, ref:'Resturant'},
	dishes:[{type:Schema.Types.ObjectId,ref:'Dish'}],
	quantity:{type:Number,default:0}
   

} as StrongSchema<IOrder>), new OrderMethods(), { timestamps: true })

OrderSchema.post('find', (doc: Document[]) => {
	var obj = doc.map(cleanObject);
	return obj;
});

OrderSchema.methods.toJSON = function () {
	return cleanObject(this.toObject());
}

export type IOrderModel = Mesh<IOrder, OrderMethods, Document>;
export const OrderModel = model<IOrderModel>('Order', OrderSchema)
