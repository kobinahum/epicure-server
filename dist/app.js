"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const routes_1 = require("./api/routes");
const error_middleware_1 = require("./middleware/error.middleware");
require("./db/mongoose-init"); // apply connection
class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.initAppUsage();
    }
    initAppUsage() {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
        this.app.use(logger('remote-addr - :remote-user [:date[clf]] \
                            ":method :url HTTP/:http-version" :status :res[content-length] \
"                           :referrer" ":user-agent" :response-time ms', {
            stream: accessLogStream,
            skip: function (req, res) {
                return req.url.startsWith('/test');
            }
        }));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeRoutes() {
        const apiRoutes = new routes_1.default();
        this.app.use('/api/', apiRoutes.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map