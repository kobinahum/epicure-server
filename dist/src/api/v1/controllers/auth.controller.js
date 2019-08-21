"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = require("../../../db/models/auth.model");
const baseCrud_controller_1 = require("../../../generics/baseCrud.controller");
const validation_middleware_1 = require("../../../middleware/validation.middleware");
const login_dto_1 = require("../dto/auth/login.dto");
const access_handler_1 = require("../../../api/v1/handlers/access.handler");
const jwt_controller_1 = require("../../../utils/controllers/jwt.controller");
class AuthController extends baseCrud_controller_1.default {
    initializeRoutes() {
        this.router.post('/', validation_middleware_1.default(login_dto_1.default), this.login.bind(this));
        this.router.post('/forgot', this.forgotPassword.bind(this));
    }
    getSchema() {
        return auth_model_1.AuthModel;
    }
    async login(request, response, next) {
        const itemData = request.body;
        const accessHandler = new access_handler_1.default();
        try {
            const user = await accessHandler.login(itemData.email.toLowerCase(), itemData.password);
            const token = jwt_controller_1.JWTController.createToken(user._id.toString());
            return response.send({ token, user });
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(request, response, next) {
        const email = request.body.email;
        const accessHandler = new access_handler_1.default();
        try {
            const auth = await accessHandler.forgotPassword(email);
            return response.send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map