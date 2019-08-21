"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_controller_1 = require("../../utils/controllers/jwt.controller");
const exceptions_1 = require("../../exceptions");
class RequestController {
    /**
     * Check received Headers and adds token value on locals
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     * @throws { ForbiddenException , InvalidTokenException}
     * @memberof RequestController
     */
    async headerValidation(req, res, next) {
        if (req.method == 'OPTIONS') {
            return next();
        }
        const authHeaderVal = req.headers.authorization;
        const token = jwt_controller_1.JWTController.cleanReceivedToken(authHeaderVal);
        if (!token) {
            next(new exceptions_1.ForbiddenException());
        }
        else {
            try {
                const decoded = await jwt_controller_1.JWTController.verifyToken(token);
                res.locals.userId = (decoded).id;
                next();
            }
            catch (error) {
                next(new exceptions_1.InvalidTokenException());
            }
        }
    }
}
exports.default = RequestController;
//# sourceMappingURL=requestController.js.map