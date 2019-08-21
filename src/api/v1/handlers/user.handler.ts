import { UserModel, IUser } from "../../../db/models/user.model";
import { PaginationModel } from '../../../utils/models/pagination.model';
import { MongooseQuery } from "../models/query/mongoose.query";
import { ItemNotFoundException, MongoErrorException } from "../../../exceptions";

class UserHandler {

	// async getUserSortedBy(queryParams: SQuery) {


	// 	const users = await UserModel.find(queryParams.conditions,{'queryParams.sort':'queryParams.'});


	// }

	async findUserByEmail(email: string) {
		try {
			const user = await UserModel.findOne({ email });
			return user;
		} catch (error) {
			throw new MongoErrorException();
		}
	}

	async getUsersWithPagination(mongooseQuery: MongooseQuery): Promise<PaginationModel<IUser>> {
		try {
			const responses = await Promise.all([
				this.getAmountOfItems(mongooseQuery),
				this.getAllUsers(mongooseQuery)
			])


			return Object.assign(new PaginationModel(), { totalPages: responses[0], items: responses[1] });
		} catch (error) {
			throw new MongoErrorException();
		}
	}

	async getUsersDataMinimize(): Promise<IUser[]> {

		return await UserModel.find({}, { firstName: 1, lastName: 1 }).exec();
	}

	async getUserProfile(id: string): Promise<IUser> {
		try {
			const user = await UserModel.findOne({ _id: id })
				.populate('department', 'name _id')
				.populate('role', 'name permissions _id')
				.exec();
			if (!user) {
				throw new ItemNotFoundException(id);
			}
			return user;
		} catch (error) {
			throw new MongoErrorException();
		}
	}

	private async getAmountOfItems(mongooseQuery: MongooseQuery) {
		try {
			const total = await UserModel.countDocuments(mongooseQuery.conditions);
			const amount = Math.ceil(total / mongooseQuery.itemsPerPage)
			return amount > 0 ? amount : 1;
		} catch (error) {
			throw new MongoErrorException()
		}
	}

	private async getAllUsers(mongooseQuery: MongooseQuery): Promise<IUser[]> {
		const pipeline = [
			{
				$lookup: {
					'from': 'roles',
					'localField': 'role',
					'foreignField': '_id',
					'as': 'roleData'
				}
			},
			{
				$unwind: '$roleData'
			},
			{
				$lookup: {
					'from': 'departments',
					'localField': 'department',
					'foreignField': '_id',
					'as': 'departmentData'
				}
			},
			{
				$unwind: '$departmentData'
			},
			{
				$match: mongooseQuery.conditions
			},
			{
				$project: {
					'_id': 1,
					'firstName': 1,
					'lastName': 1,
					'email': 1,
					'role': '$roleData',
					'department': '$departmentData',
				}
			},
			{
				$sort: mongooseQuery.sort
			},
			{
				$skip: mongooseQuery.skip
			},
			{
				$limit: mongooseQuery.itemsPerPage
			},

		]
		try {
			const users = await UserModel.aggregate(pipeline);
			return users as IUser[];
		} catch (error) {
			throw new MongoErrorException()
		}

	}


}

export default UserHandler;
