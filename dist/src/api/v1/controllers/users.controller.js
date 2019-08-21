"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../../db/models/user.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const validation_middleware_1 = require("../../../middleware/validation.middleware");
const register_dto_1 = require("../dto/auth/register.dto");
const access_handler_1 = require("../handlers/access.handler");
const user_handler_1 = require("../handlers/user.handler");
const user_query_1 = require("../models/query/user.query");
class UsersController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.get('/', this.getUsersWithPagination.bind(this));
        this.router.get('/minimize', this.getUsersMinimize.bind(this));
        this.router.get('/profile', this.getUserProfile.bind(this));
        this.router.post('/register', validation_middleware_1.default(register_dto_1.default), this.registerNewUser.bind(this));
        this.router.post('/email', this.checkIfEmailExist.bind(this));
        this.router.put('/', this.update.bind(this));
        this.router.delete('/', this.delete.bind(this));
    }
    getSchema() {
        return user_model_1.UserModel;
    }
    async registerNewUser(request, response, next) {
        const itemData = request.body;
        const accessHandler = new access_handler_1.default();
        try {
            const user = await accessHandler.register(itemData.email, 'Aa123456', itemData.firstName, itemData.lastName, itemData.phone, itemData.role, itemData.department);
            return response.send(user);
        }
        catch (error) {
            next(error);
        }
    }
    async checkIfEmailExist(request, response, next) {
        const email = request.body.email;
        const usersHandler = new user_handler_1.default();
        try {
            const user = await usersHandler.findUserByEmail(email);
            if (!user) {
                return response.send({ exist: false });
            }
            return response.send({ exist: true });
        }
        catch (error) {
            next(error);
        }
    }
    async getUsersWithPagination(request, response, next) {
        const usersHandler = new user_handler_1.default();
        const userQuery = new user_query_1.UserQuery(request.query);
        const mongooseQuery = userQuery.mongooseQueryCreator();
        try {
            const paginationData = await usersHandler.getUsersWithPagination(mongooseQuery);
            response.send(paginationData);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserProfile(request, response, next) {
        const usersHandler = new user_handler_1.default();
        const id = response.locals.userId;
        try {
            const user = await usersHandler.getUserProfile(id);
            response.send(user);
        }
        catch (error) {
            next(error);
        }
    }
    async getUsersMinimize(request, response, next) {
        const usersHandler = new user_handler_1.default();
        try {
            const users = await usersHandler.getUsersDataMinimize();
            response.send(users);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map