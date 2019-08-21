import { model, Document, Schema, NativeError } from "mongoose";
import * as mongooseExtensions from "types/mongoose";
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';

import { DocumentStatusEnum } from "../../types/documentStatus.enum";
import { cleanObject } from "../../generics/genericFunctions";

export interface IUser extends ISchema {
	firstName: string;
	lastName: string;
	email: string;
	status: DocumentStatusEnum
}

class UserMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const UserSchema = createStrongSchema(({
	firstName: { type: String },
	lastName: { type: String },
	email: {
		type: String,
		required: 'email is required',
		unique: true,
		lowercase: true,
		trim: true,
		match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/
	},
	status: {type: Number, default: 1}
} as StrongSchema<IUser>), new UserMethods(), { timestamps: true })

UserSchema.post('find', (doc: Document[]) => {
	var obj = doc.map(cleanObject);
	return obj
});

UserSchema.methods.toJSON = function () {
	return cleanObject(this.toObject());
}

export type IUserModel = Mesh<IUser, UserMethods, Document>;
export const UserModel = model<IUserModel>('User', UserSchema)
