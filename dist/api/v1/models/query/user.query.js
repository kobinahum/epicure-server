"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sorting_enum_1 = require("../../enums/sorting.enum");
const mongoose_1 = require("mongoose");
const mongoose_query_1 = require("./mongoose.query");
class UserQuery {
    /**
     *
     */
    constructor(query) {
        this.department = query.department;
        this.role = query.role;
        this.searchText = query.searchText;
        this.sort = (parseInt(query.sort, 10) || 1);
        this.descending = query.descending === "true";
        this.page = (parseInt(query.page, 10) || 0);
        this.itemsPerPage = (parseInt(query.itemsPerPage, 10) || 0);
    }
    mongooseQueryCreator() {
        const mongooseQuery = new mongoose_query_1.MongooseQuery();
        mongooseQuery.conditions = this.createSearchCondition();
        mongooseQuery.itemsPerPage = this.itemsPerPage;
        mongooseQuery.skip = this.page * mongooseQuery.itemsPerPage;
        mongooseQuery.sort = this.sortBy();
        return mongooseQuery;
    }
    sortBy() {
        const sortType = this.descending ? -1 : 1;
        let sortObj;
        switch (this.sort) {
            case sorting_enum_1.SortingEnums.FirstName:
                sortObj = { 'firstName': sortType };
                break;
            case sorting_enum_1.SortingEnums.LastName:
                sortObj = { 'lastName': sortType };
                break;
            case sorting_enum_1.SortingEnums.Email:
                sortObj = { 'email': sortType };
                break;
            case sorting_enum_1.SortingEnums.Role:
                sortObj = { 'role.name': sortType };
                break;
            default:
                sortObj = { 'firstName': sortType };
                break;
        }
        return sortObj;
    }
    createSearchCondition() {
        const condition = {};
        if (this.searchText) {
            condition['$or'] = [
                { firstName: { $regex: this.searchText, $options: 'i' } },
                { lastName: { $regex: this.searchText, $options: 'i' } },
                { email: { $regex: this.searchText, $options: 'i' } },
            ];
        }
        if (this.role) {
            condition['role'] = mongoose_1.Types.ObjectId(this.role);
        }
        if (this.department) {
            condition['department'] = mongoose_1.Types.ObjectId(this.department);
        }
        return condition;
    }
}
exports.UserQuery = UserQuery;
//# sourceMappingURL=user.query.js.map