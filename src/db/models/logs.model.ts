import { Schema, model, Document } from 'mongoose';
import { BoundTo, Mesh, StrongSchema, createStrongSchema } from './../../utils/ts-coverage';
import { IUserModel } from './user.model';

export interface ILog {
    _id: Schema.Types.ObjectId;
    route: string;
    http: string,
    query: string,
    user: Schema.Types.ObjectId | IUserModel;
    body: string;
    resp_status: number;
	error: string;
	error_custom_code: number;
	hasError: boolean
}


class LogMethods {
    /**
     * print this doc _id.
     */
    //  printId: BoundTo<IUserModel> = function() { console.log(this._id); };
    // more methods ...
}

const LogSchema = createStrongSchema(({
    route: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    query: {type: String},
    http: { type: String },
    body: { type: String },
    hasError: { type: Boolean , default: false},
    resp_status: { type: Number },
    error_custom_code: { type: Number },
    error: { type: String },
} as StrongSchema<ILog>), new LogMethods(), { timestamps: true })

LogSchema.set('toJSON', { transform: function (doc: any, ret: any, option: any) { return ret; } })

export type ILogModel = Mesh<ILog, LogMethods, Document>;
export const logModel = model<ILogModel>('log', LogSchema)
