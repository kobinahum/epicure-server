import { model, Document, Schema, NativeError } from "mongoose";
import * as validator from 'validator';
import * as mongooseExtensions from "types/mongoose";
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';
import {CategoryEnums} from '../../../src/api/v1/enums/category.enum'

import { DocumentStatusEnum } from "../../types/documentStatus.enum";
import { cleanObject } from "../../generics/genericFunctions";
import { Double, Int32 } from "bson";

export interface IDish extends ISchema {
    name: string;
    category:CategoryEnums;
	ingredients: string[];
	price:number;
    is_spicy:boolean;
    is_vegan:boolean;
    is_vegitarian:boolean;
    side_dish:string[];
    changes:string[];
    picture:string;

}

class DishMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const DishSchema = createStrongSchema(({
    name: { type: String,unique:true,required:true,trim:true},
    category:{type: Number,required:true,min:1,max:4,validate : {
        validator : Number.isInteger,
        message   : '{VALUE} categoy gets numbers between 1 to 4'
      }},
	ingredients:{type:[String],required:true},
	price:{type:Number,required:false,default:0},
	is_spicy: {type: Boolean,required:false,default:false},
    is_vegan:{type: Boolean,required:false,default:false},
    is_vegitarian:{type: Boolean,required:false,default:false},
    side_dish:{type:[String],required:false},
    changes:{type:[String],required:false},
	picture:{type:String,required:false}

} as StrongSchema<IDish>), new DishMethods(), { timestamps: true })

DishSchema.post('find', (doc: Document[]) => {
	var obj = doc.map(cleanObject);
	return obj
});

DishSchema.methods.toJSON = function () {
	return cleanObject(this.toObject());
}

export type IDishModel = Mesh<IDish, DishMethods, Document>;
export const DishModel = model<IDishModel>('Dish', DishSchema)
