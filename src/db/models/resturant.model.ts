import { model, Document, Schema, NativeError } from "mongoose";
import * as validator from 'validator';
import * as mongooseExtensions from "types/mongoose";
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';

import { DocumentStatusEnum } from "../../types/documentStatus.enum";
import { cleanObject } from "../../generics/genericFunctions";
import { Double } from "bson";
import {IChefModel}from '../models/chef.model';
import {IDishModel} from '../models/dish.model';


export interface IResturant extends ISchema {
	name: string;
	chef: Schema.Types.ObjectId|IChefModel;
	contact: {
		phone:number,
		email:string,
		address:string
	}
	opening_date:Date;//not the best option DATE
	cuisine:string;
	dishes: Schema.Types.Array|IDishModel;//Schema
	signature_dish:Schema.Types.ObjectId|IDishModel;
	popular_score:number;//between 0.0-5
	opening_hours:Date;
	closing_hours:Date;
	picture:string;//url to img path

}

class ResturantMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const ResturantSchema = createStrongSchema(({
	name: { type: String,required:true,trim:true},
	chef: { type: Schema.Types.ObjectId, ref: 'Chef', default:"5d594a92e5a8fb0752a5367d" },
	contact: {
		phone:{type:Number,required:false},
		email:{type:String,required:false,trim:true,lowercase:true,validate(value:string){
			if(!validator.isEmail(value)) throw new Error("Invalid Email address..");
		}},
		address:{type:String,required:false,trim:true}
	},
	opening_date:{type:Date,default:Date.now()},
	opening_hours: {type: Date,default:new Date("1970-01-01T07:00:01.900Z")},
	closing_hours: {type: Date,default:new Date("1970-01-01T19:00:01.900Z")},
	cuisine:{type: String,required:true,trim:true},
	dishes:[{type:Schema.Types.ObjectId,ref:'Dish'}],
	signature_dish:{type:Schema.Types.ObjectId,ref:'Dish'},
	popular_score:{type:Number,min:0,max:5},
	picture:{type:String}

} as StrongSchema<IResturant>), new ResturantMethods(), { timestamps: true })

ResturantSchema.post('find', (doc: Document[]) => {
	var obj = doc.map(cleanObject);
	return obj
});

ResturantSchema.methods.toJSON = function () {
	return cleanObject(this.toObject());
}

export type IResturantModel = Mesh<IResturant, ResturantMethods, Document>;
export const ResturantModel = model<IResturantModel>('Resturant', ResturantSchema)
