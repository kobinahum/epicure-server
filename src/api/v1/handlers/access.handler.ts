import { AuthModel } from "../../../db/models/auth.model";
import { UserModel } from "../../../db/models/user.model";
import {ExceptionTypesEnum ,HttpException, LoginException } from "../../../exceptions";

var moment = require('moment');
var forgotPasswordConfig = require('config').get('Security.ForgotPassword');

import * as uniqid from 'uniqid';

const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

class AccessHandler {

    async login(email: string, password: string) {
        try {
            const auth = await AuthModel.findOne({ email: email }).populate({path:'user', select: '-createdAt -updatedAt -__v'}).lean().exec();
            if (auth) {
				if (this.comparePasswordToDB(password, auth.password)) {
					return auth.user
				}
            }
            throw new LoginException();
        } catch (error) {
            throw new LoginException();
        }
	}

	async comparePasswordToDB(plainTextPassword: string, existingHashedPassword: string) {
		try {
			const isMatch = bcrypt.compare(plainTextPassword, existingHashedPassword);
			if (isMatch) {
				return isMatch;
			}
			throw new HttpException(400, "Wrong Password", ExceptionTypesEnum.WrongPassword)
		} catch (error) {
			throw new HttpException(400, "Wrong Password",ExceptionTypesEnum.WrongPassword)
		}
	}

    async register(email: string, password: string, firstName: string, lastName: string, phone: string, role: string, department: string) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS)
            if (!salt) {
                throw new HttpException(400, 'not implemented', ExceptionTypesEnum.Unknown)
            }
            const hash = await bcrypt.hash(password, salt)
            if (!hash) {
                throw new HttpException(400, 'not implemented', ExceptionTypesEnum.Unknown)
            }
            var newUser = new UserModel({
                firstName: firstName,
				lastName: lastName,
                email: email,
                phone: phone,
				role: role,
				department: department
            });
            const savedUser = await newUser.save()
            let newUserAuthorization = new AuthModel({
                user: savedUser._id,
                email: email,
                password: hash,
                phone: phone,
                //TODO: remove in production!!
                realPassword: password
            });
            await newUserAuthorization.save();
            return savedUser
        } catch (error) {
            throw new LoginException();
        }
	}

	async forgotPassword(email: string) {
		try {
			const auth = await AuthModel.findOne({ email }).exec()
			if (!auth) {
				throw new HttpException(400, 'Not implemented', ExceptionTypesEnum.Unknown)
			}
			// get temp password
			var tempPassword = uniqid();
			// get hashed pass
			const salt = await bcrypt.genSalt(SALT_ROUNDS)
			const hash = await bcrypt.hash(tempPassword, salt)

			var expiry = moment().add(forgotPasswordConfig.hoursExpiry, 'hours');
			auth.forgotPassword = {
				tempPassword: hash,
				expiry: expiry
			};
			const savedAuth = await auth.save()
			const updatedAuth = await AuthModel.findOneAndUpdate({_id: savedAuth._id}, { hasTemporaryPassword: true }).lean().exec();
			if (!updatedAuth) {
				throw new HttpException(400, 'Not implemented', ExceptionTypesEnum.Unknown)
			}
			return updatedAuth
		} catch (error) {
			throw new HttpException(400, 'Not implemented', ExceptionTypesEnum.Unknown)
		}
	}

}

export default AccessHandler;
