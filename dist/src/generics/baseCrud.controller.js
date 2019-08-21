"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exceptions_1 = require("../exceptions");
class CrudController {
    constructor() {
        this.router = express_1.Router();
        this.initializeRoutes();
        this.t = this.getSchema();
    }
    async getAll(request, response, next) {
        try {
            const query = this.t.find().lean();
            if (this.baseSort) {
                query.sort(this.baseSort);
            }
            const items = await query.exec();
            response.send(items);
        }
        catch (error) {
            next(new exceptions_1.MongoErrorException());
        }
    }
    async create(request, response, next) {
        const itemData = request.body;
        var mod = this.getSchema();
        const createdItem = new mod(itemData);
        try {
            const newItem = await createdItem.save();
            response.send(newItem);
        }
        catch (error) {
            next(new exceptions_1.MongoErrorException());
        }
    }
    async delete(request, response, next) {
        const itemId = request.query.itemId;
        try {
            const updated = await this.t.findOneAndUpdate({ _id: itemId }, { status: 0 }).lean().exec();
            response.send(updated);
        }
        catch (error) {
            next(new exceptions_1.MongoErrorException());
        }
    }
    async update(request, response, next) {
        const itemData = request.body;
        try {
            const updated = await this.t.findOneAndUpdate({ _id: itemData._id }, { $set: itemData }).lean().exec();
            response.send(updated);
        }
        catch (error) {
            next(new exceptions_1.MongoErrorException());
        }
    }
}
exports.default = CrudController;
//# sourceMappingURL=baseCrud.controller.js.map