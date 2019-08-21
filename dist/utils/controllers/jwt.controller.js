"use strict";
/**
  *
  * Welcome to the JWT (Json Web Tokens)
  *
  * In order to use this module you need to accomplish to the following task:
  * 1. npm install jsonwebtoken --save
  * 2. npm install bcryptjs --save
  * 3. create a complex key that should be saved in the config file
  *
  * several notes:
  * 1. When sending the token it should be on the authorization section under the bearer key
  * 2. Once the a user is being verified his token, you should save it to res.locals.userID and check if the verified user has the right permissions to do the current query.
  * 3. if you gets an error from the verified function you should send special error code to the client like: res.status(401).json('Failed to authenticate token.');
*/
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config = require("config");
const exceptions_1 = require("../../exceptions");
class JWTController {
    /**
     * Create a token from a user Id.
     *
     * @static
     * @param {*} userID
     * @returns {string}
     * @memberof JWTController
     */
    static createToken(userID) {
        var token = jsonwebtoken_1.sign({ id: userID }, this.forToken.value, {
            expiresIn: this.expirationDuration
        });
        return token;
    }
    /**
     * Verify received token.
     *
     * @static
     * @param {string} token
     * @returns {(Promise<{id: string}>)}
     * @memberof JWTController
     */
    static async verifyToken(token) {
        try {
            const decodedToken = await jsonwebtoken_1.verify(token, this.forToken.value);
            return decodedToken;
        }
        catch (err) {
            throw new exceptions_1.InvalidTokenException();
        }
    }
    /**
     *Remove the Bearer from  header token
     *
     * @static
     * @param {string} authHeader
     * @returns {string}
     * @memberof JWTController
     */
    static cleanReceivedToken(authHeader) {
        let token;
        if (authHeader && authHeader.includes("Bearer ")) {
            token = authHeader.substring(7, authHeader.length);
        }
        return token;
    }
}
JWTController.forToken = config.get('Security.Request.ForToken');
JWTController.expirationDuration = '3h';
exports.JWTController = JWTController;
//# sourceMappingURL=jwt.controller.js.map