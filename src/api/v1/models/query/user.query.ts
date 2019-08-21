import { IMongooseQueryCreator } from "../../interfaces/mongooseQueryCreator.interface";
import { ISortable } from "../../interfaces/sortable.interface";
import { SortingEnums } from "../../enums/sorting.enum";
import {Types, Schema} from 'mongoose';
import { MongooseQuery } from "./mongoose.query";


export class UserQuery implements IMongooseQueryCreator, ISortable {

	department: string;
	role: string;
	searchText: string;
	sort: SortingEnums;
	descending: boolean;
	page: number;
	itemsPerPage: number;

	/**
	 *
	 */
	constructor(query: any) {
		this.department = query.department;
		this.role = query.role;
		this.searchText = query.searchText;
		this.sort = (parseInt(query.sort, 10) || 1);
		this.descending = query.descending === "true";
		this.page = (parseInt(query.page, 10) || 0)
		this.itemsPerPage = (parseInt(query.itemsPerPage, 10) || 0);
	}

	public mongooseQueryCreator(): MongooseQuery {
		const mongooseQuery = new MongooseQuery();

		mongooseQuery.conditions = this.createSearchCondition();
		mongooseQuery.itemsPerPage = this.itemsPerPage;
		mongooseQuery.skip = this.page * mongooseQuery.itemsPerPage;
		mongooseQuery.sort = this.sortBy();

		return mongooseQuery;
	}

	sortBy() {
		const sortType = this.descending ? -1 : 1;
		let sortObj: {};

		switch (this.sort) {
			case SortingEnums.FirstName:
				sortObj = { 'firstName': sortType };
				break;
			case SortingEnums.LastName:
				sortObj = { 'lastName': sortType };
				break;
			case SortingEnums.Email:
				sortObj = { 'email': sortType };
				break;
			case SortingEnums.Role:
				sortObj = { 'role.name': sortType };
				break;
			default:
				sortObj = { 'firstName': sortType };
				break;
		}

		return sortObj;

	}

	private createSearchCondition() {
		const condition: {$or?: {} , role?: Types.ObjectId | undefined, department?: Types.ObjectId | undefined } = {};
		if (this.searchText) {
			condition['$or'] = [
				{ firstName: { $regex: this.searchText, $options: 'i' } },
				{ lastName: { $regex: this.searchText, $options: 'i' } },
				{ email: { $regex: this.searchText, $options: 'i' } },
			]
		}

		if (this.role) {
			condition['role'] = Types.ObjectId(this.role);
		}

		if (this.department) {
			condition['department'] = Types.ObjectId(this.department);
		}
		return condition;
	}
}
