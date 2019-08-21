import { model, Document, Schema, NativeError } from "mongoose";
import * as validator from 'validator';
import * as mongooseExtensions from "types/mongoose";
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';

import { DocumentStatusEnum } from "../../types/documentStatus.enum";
import { cleanObject } from "../../generics/genericFunctions";
import { Double } from "bson";
import {IResturantModel} from '../models/resturant.model';

export interface IChef extends ISchema {
	name: string;
	resturants: Schema.Types.Array|IResturantModel;//Schema
	view_count:number;
    picture:string;
    join_date:Date;

}

class ChefMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const ChefSchema = createStrongSchema(({
	name: { type: String,unique:true,required:true,trim:true},
	resturants:[{type:Schema.Types.ObjectId,ref:'Resturant'}],
	view_count:{type:Number,required:false,default:0},
    picture:{type:String,required:false},
    join_date:{type:Date,default:Date.now()}

} as StrongSchema<IChef>), new ChefMethods(), { timestamps: true })

ChefSchema.post('find', (doc: Document[]) => {
	var obj = doc.map(cleanObject);
	return obj;
});

ChefSchema.methods.toJSON = function () {
	return cleanObject(this.toObject());
}

export type IChefModel = Mesh<IChef, ChefMethods, Document>;
export const ChefModel = model<IChefModel>('Chef', ChefSchema)
