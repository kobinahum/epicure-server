"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_model_1 = require("../../db/models/logs.model");
const exceptions_1 = require("../../exceptions");
class LogController {
    /**
     * Gets relevant data from the request, creates a new log on db , saves the id on locals
     *
     * @param {string} logId
     * @param {number} status
     * @param {string} [error]
     * @returns {void}
     * @throws {MongoErrorException}
     * @memberof LogController
     */
    static async createLog(req, res) {
        const user = res.locals.userId;
        const route = req.path;
        const http = req.method;
        const body = req.body ? JSON.stringify(req.body) : undefined;
        const query = req.query ? JSON.stringify(req.query) : undefined;
        const newLog = new logs_model_1.logModel({
            user, route, http, body, query
        });
        try {
            const savedLog = await newLog.save();
            res.locals.logId = savedLog._id.toString();
            return;
        }
        catch (err) {
            throw new exceptions_1.MongoErrorException();
        }
    }
    /**
     * Set status and error to a existing log.
     *
     * @param {string} logId
     * @param {number} status
     * @param {string} [error]
     * @returns {void}
     * @throws {MongoErrorException}
     * @memberof LogController
     */
    static async setStatusAndResponse(logId, status, error, error_custom_code) {
        const respError = error ? JSON.stringify(error) : undefined;
        try {
            await logs_model_1.logModel.findOneAndUpdate({ _id: logId }, {
                $set: {
                    resp_status: status,
                    error: respError,
                    error_custom_code,
                    hasError: true
                }
            });
            return;
        }
        catch (error) {
            throw new exceptions_1.MongoErrorException();
        }
    }
}
exports.LogController = LogController;
//# sourceMappingURL=log.controller.js.map