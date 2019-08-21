import { MongooseQuery } from "../models/query/mongoose.query";

export interface IMongooseQueryCreator {
	mongooseQueryCreator(): MongooseQuery;
}
