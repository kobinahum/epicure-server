"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resturant_model_1 = require("../../../db/models/resturant.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const resturant_handler_1 = require("../handlers/resturant.handler");
const validation_middleware_1 = require("../../../middleware/validation.middleware");
const resturant_dto_1 = require("../dto/resturant.dto");
const chef_handler_1 = require("../handlers/chef.handler");
const dish_handler_1 = require("../handlers/dish.handler");
class ResturantController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.post('/', validation_middleware_1.default(resturant_dto_1.default), this.createResturant.bind(this)); //validationMiddleware(createResturantDTO),
        this.router.get('/', this.getResturantByParam.bind(this));
        this.router.get('/search', this.search.bind(this));
        this.router.get('/top3', this.getTop3Resturants.bind(this));
        this.router.get('/singturedishs', this.getSigntureDishs.bind(this));
        this.router.get('/allrests', this.getAllResturants.bind(this));
        this.router.get('/newrests', this.getNewResturants.bind(this));
        this.router.get('/popularrests', this.getPopularResturants.bind(this));
        this.router.get('/openrests', this.getCurrentlyOpenResturants.bind(this));
        this.router.get('/resturantbyname', this.getResturantByName.bind(this));
        //this.router.get('/opennow',this.getCurrentlyOpenResturants.bind(this));
        this.router.put('/', this.editResturantById.bind(this));
    }
    getSchema() {
        return resturant_model_1.ResturantModel;
    }
    async createResturant(request, response, next) {
        const resturantData = request.body;
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturant = await resturantHandler.createResturant(resturantData);
            return response.send(resturant);
        }
        catch (error) {
            response.send(error);
        }
    }
    async getResturantByParam(request, response, next) {
        if (request.query.id) {
            await this.getResturantById(request, response, next, request.query.id);
        }
        else if (request.query.name) {
            await this.getResturantByName(request, response, next, request.query.name);
        }
        else {
            await this.getHomePage(request, response, next);
        }
    }
    async getResturantById(request, response, next, id) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturant = await resturantHandler.getResturantById(id);
            return response.send(resturant);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getHomePage(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        const resturantHandler = new resturant_handler_1.default();
        Promise.all([resturantHandler.getTop3Resturants(), resturantHandler.getSigntureDishes(), chefHandler.chefOfTheWeek()]).then(values => {
            return response.send(values);
        }).catch(error => {
            return response.send(error);
        });
    }
    async search(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        const resturantHandler = new resturant_handler_1.default();
        const dishHandler = new dish_handler_1.default();
        const param = request.query.search;
        Promise.all([resturantHandler.search(param), dishHandler.search(param), chefHandler.search(param)]).then(values => {
            return response.send(values);
        }).catch(error => {
            return response.send(error);
        });
    }
    async getTop3Resturants(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getTop3Resturants();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getSigntureDishs(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getSigntureDishes();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getAllResturants(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getAllResturants();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getNewResturants(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getNewResturants();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getPopularResturants(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getPopularResturants();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getCurrentlyOpenResturants(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        try {
            const resturants = await resturantHandler.getCurrentlyOpenResturants();
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    async getResturantByName(request, response, next, index = 1) {
        const resturantName = request.query.name;
        try {
            const resturants = await this.resturantPaging(resturantName, index);
            return response.send(resturants);
        }
        catch (error) {
            return response.send(error);
        }
    }
    //given resturant name, returning 6*index resturants
    async resturantPaging(resturantName, index = 1) {
        const resturantHandler = new resturant_handler_1.default();
        const resturants = await resturantHandler.getResturantByName(resturantName, index);
        return resturants;
    }
    async editResturantById(request, response, next) {
        const resturantHandler = new resturant_handler_1.default();
        const id = request.query.id;
        const params = request.body;
        if (!id || !params)
            return;
        try {
            const updatedResturant = await resturantHandler.editResturantById(id, params);
            if (!updatedResturant)
                return response.send("Cannot find resturant, try diffrent ID").status(404);
            return response.send(updatedResturant);
        }
        catch (error) {
            return response.send(error);
        }
    }
}
exports.default = ResturantController;
//# sourceMappingURL=resturant.controller.js.map