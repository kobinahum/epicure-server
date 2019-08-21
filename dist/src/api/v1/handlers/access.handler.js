"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = require("../../../db/models/auth.model");
const user_model_1 = require("../../../db/models/user.model");
const exceptions_1 = require("../../../exceptions");
var moment = require('moment');
var forgotPasswordConfig = require('config').get('Security.ForgotPassword');
const uniqid = require("uniqid");
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;
class AccessHandler {
    async login(email, password) {
        try {
            const auth = await auth_model_1.AuthModel.findOne({ email: email }).populate({ path: 'user', select: '-createdAt -updatedAt -__v' }).lean().exec();
            if (auth) {
                if (this.comparePasswordToDB(password, auth.password)) {
                    return auth.user;
                }
            }
            throw new exceptions_1.LoginException();
        }
        catch (error) {
            throw new exceptions_1.LoginException();
        }
    }
    async comparePasswordToDB(plainTextPassword, existingHashedPassword) {
        try {
            const isMatch = bcrypt.compare(plainTextPassword, existingHashedPassword);
            if (isMatch) {
                return isMatch;
            }
            throw new exceptions_1.HttpException(400, "Wrong Password", exceptions_1.ExceptionTypesEnum.WrongPassword);
        }
        catch (error) {
            throw new exceptions_1.HttpException(400, "Wrong Password", exceptions_1.ExceptionTypesEnum.WrongPassword);
        }
    }
    async register(email, password, firstName, lastName, phone, role, department) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            if (!salt) {
                throw new exceptions_1.HttpException(400, 'not implemented', exceptions_1.ExceptionTypesEnum.Unknown);
            }
            const hash = await bcrypt.hash(password, salt);
            if (!hash) {
                throw new exceptions_1.HttpException(400, 'not implemented', exceptions_1.ExceptionTypesEnum.Unknown);
            }
            var newUser = new user_model_1.UserModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                role: role,
                department: department
            });
            const savedUser = await newUser.save();
            let newUserAuthorization = new auth_model_1.AuthModel({
                user: savedUser._id,
                email: email,
                password: hash,
                phone: phone,
                //TODO: remove in production!!
                realPassword: password
            });
            await newUserAuthorization.save();
            return savedUser;
        }
        catch (error) {
            throw new exceptions_1.LoginException();
        }
    }
    async forgotPassword(email) {
        try {
            const auth = await auth_model_1.AuthModel.findOne({ email }).exec();
            if (!auth) {
                throw new exceptions_1.HttpException(400, 'Not implemented', exceptions_1.ExceptionTypesEnum.Unknown);
            }
            // get temp password
            var tempPassword = uniqid();
            // get hashed pass
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hash = await bcrypt.hash(tempPassword, salt);
            var expiry = moment().add(forgotPasswordConfig.hoursExpiry, 'hours');
            auth.forgotPassword = {
                tempPassword: hash,
                expiry: expiry
            };
            const savedAuth = await auth.save();
            const updatedAuth = await auth_model_1.AuthModel.findOneAndUpdate({ _id: savedAuth._id }, { hasTemporaryPassword: true }).lean().exec();
            if (!updatedAuth) {
                throw new exceptions_1.HttpException(400, 'Not implemented', exceptions_1.ExceptionTypesEnum.Unknown);
            }
            return updatedAuth;
        }
        catch (error) {
            throw new exceptions_1.HttpException(400, 'Not implemented', exceptions_1.ExceptionTypesEnum.Unknown);
        }
    }
}
exports.default = AccessHandler;
//# sourceMappingURL=access.handler.js.map