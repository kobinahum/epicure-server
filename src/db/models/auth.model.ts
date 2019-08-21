import { model, Document, Schema, Model } from 'mongoose';
import { Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import ISchema from 'generics/baseInterface.interface';
import { IUser } from './user.model';
import { DocumentStatusEnum } from '../../types/documentStatus.enum';

export interface IAuth extends ISchema {
    email: string;
    password: string;
    realPassword: string;
	user: Schema.Types.ObjectId | IUser;
	forgotPassword: IForgotPassword;
	hasTemporaryPassword: boolean;
	status: DocumentStatusEnum;

}

export interface IForgotPassword {
    tempPassword: string;
    expiry: Date;
}

export interface IRegister extends ISchema {
    email: string;
    password: string;
	firstName: string;
	lastName: string;
	phone: string;
	role: string;
	department: string;
}

class AuthMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

class ForgotPasswordMethods {
    /**
     * print this doc _id.
     */
	//  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
	// more methods ...
}

const forgotPasswordSchema = createStrongSchema(({
	tempPassword: {
		type: String,
		required: true
	},
	expiry: {
		type: Date,
		required: true
	}
} as StrongSchema<IForgotPassword>), new ForgotPasswordMethods(), { timestamps: true })

const AuthSchema = createStrongSchema(({
	email: { 	type: String,
				required: 'email is required',
				unique: true,
				lowercase: true,
				trim: true,
				match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/ },
    password: { type: String },
    realPassword: { type: String },
	user: { type: Schema.Types.ObjectId , ref: "User" },
	forgotPassword: { type: forgotPasswordSchema },
	hasTemporaryPassword: { type: Boolean },
	status: {type: Number, default: 1}
} as StrongSchema<IAuth>), new AuthMethods(), { timestamps: true })

AuthSchema.set('toJSON', { transform: function (doc: any, ret: any, option: any) { return ret; } })

export type IAuthModel = Mesh<IAuth, AuthMethods, Document>;
export const AuthModel:Model<IAuthModel> = model<IAuthModel>('Auth', AuthSchema);
