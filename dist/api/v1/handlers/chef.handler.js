"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chef_model_1 = require("../../../db/models/chef.model");
class ChefHandler {
    async createChef(chefData) {
        try {
            const chef = await new chef_model_1.ChefModel(chefData).save();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async chefOfTheWeek() {
        try {
            const chef = await chef_model_1.ChefModel.find({}, { name: 1, _id: 0 }).sort({ view_count: 1 }).limit(1).populate('resturants', { name: 1, _id: 0 });
            if (!chef)
                throw new Error();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async allChefs() {
        try {
            const chef = await chef_model_1.ChefModel.find({}, { name: 1, _id: 0, picture: 1 });
            if (!chef)
                throw new Error();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async newChefs() {
        try {
            const chef = await chef_model_1.ChefModel.find({}, { name: 1, _id: 0, picture: 1 }).sort({ join_date: 1 }).limit(6);
            if (!chef)
                throw new Error();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async popularChefs() {
        try {
            const chef = await chef_model_1.ChefModel.find({}, { name: 1, _id: 0, picture: 1 }).sort({ view_count: 1 }).limit(6);
            if (!chef)
                throw new Error();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async search(param) {
        try {
            const chef = await chef_model_1.ChefModel.find({ name: param });
            if (!chef)
                throw new Error();
            return chef;
        }
        catch (error) {
            return error;
        }
    }
    async getChefResturants(id) {
        try {
            const resturants = await chef_model_1.ChefModel.find({ _id: id }).populate('resturants');
            if (!resturants)
                throw new Error();
            return resturants;
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = ChefHandler;
//# sourceMappingURL=chef.handler.js.map