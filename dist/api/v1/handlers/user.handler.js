"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../../db/models/user.model");
const pagination_model_1 = require("../../../utils/models/pagination.model");
const exceptions_1 = require("../../../exceptions");
class UserHandler {
    // async getUserSortedBy(queryParams: SQuery) {
    // 	const users = await UserModel.find(queryParams.conditions,{'queryParams.sort':'queryParams.'});
    // }
    async findUserByEmail(email) {
        try {
            const user = await user_model_1.UserModel.findOne({ email });
            return user;
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
    async getUsersWithPagination(mongooseQuery) {
        try {
            const responses = await Promise.all([
                this.getAmountOfItems(mongooseQuery),
                this.getAllUsers(mongooseQuery)
            ]);
            return Object.assign(new pagination_model_1.PaginationModel(), { totalPages: responses[0], items: responses[1] });
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
    async getUsersDataMinimize() {
        return await user_model_1.UserModel.find({}, { firstName: 1, lastName: 1 }).exec();
    }
    async getUserProfile(id) {
        try {
            const user = await user_model_1.UserModel.findOne({ _id: id })
                .populate('department', 'name _id')
                .populate('role', 'name permissions _id')
                .exec();
            if (!user) {
                throw new exceptions_1.ItemNotFoundException(id);
            }
            return user;
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
    async getAmountOfItems(mongooseQuery) {
        try {
            const total = await user_model_1.UserModel.countDocuments(mongooseQuery.conditions);
            const amount = Math.ceil(total / mongooseQuery.itemsPerPage);
            return amount > 0 ? amount : 1;
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
    async getAllUsers(mongooseQuery) {
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
        ];
        try {
            const users = await user_model_1.UserModel.aggregate(pipeline);
            return users;
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
}
exports.default = UserHandler;
//# sourceMappingURL=user.handler.js.map