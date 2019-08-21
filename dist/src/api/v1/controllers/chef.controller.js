"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chef_model_1 = require("../../../db/models/chef.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const chef_handler_1 = require("../handlers/chef.handler");
const validation_middleware_1 = require("../../../middleware/validation.middleware");
const chef_dto_1 = require("../dto/chef.dto");
class ChefController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.post('/', validation_middleware_1.default(chef_dto_1.default), this.createChef.bind(this)); //
        this.router.get('/chefoftheweek', this.chefOfTheWeek.bind(this));
        this.router.get('/allchefs', this.allChefs.bind(this));
        this.router.get('/newchefs', this.newChefs.bind(this));
        this.router.get('/popularchefs', this.popularChefs.bind(this));
        this.router.get('/resturantsbyid', this.getChefResturants.bind(this));
    }
    getSchema() {
        return chef_model_1.ChefModel;
    }
    async createChef(request, response, next) {
        const chefData = request.body;
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.createChef(chefData);
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async chefOfTheWeek(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.chefOfTheWeek();
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async allChefs(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.allChefs();
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async newChefs(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.newChefs();
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async popularChefs(request, response, next) {
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.popularChefs();
            return response.send(chef);
        }
        catch (error) {
            response.send(error);
        }
    }
    async getChefResturants(request, response, next) {
        const id = request.query.id;
        if (!id)
            return response.send("Not Found").status(404);
        const chefHandler = new chef_handler_1.default();
        try {
            const chef = await chefHandler.getChefResturants(id);
            return response.send(chef);
        }
        catch (error) {
            return response.send(error);
        }
    }
}
exports.default = ChefController;
//# sourceMappingURL=chef.controller.js.map