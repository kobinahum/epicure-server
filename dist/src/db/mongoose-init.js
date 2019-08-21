"use strict";
// import * as mongoose from 'mongoose';
// import * as config from 'config';
// import * as debug from 'debug';
Object.defineProperty(exports, "__esModule", { value: true });
// const error = debug('mongooseInit:error');
// const log = debug('mongooseInit:log');
// const dbConfig = config.get('MongoDB.Configurations') as {[key: string]: string};
// const uri = getUriFromDbConfig(dbConfig)
// mongoose.connect(uri, { useNewUrlParser: true});  // connect to db
// const db = mongoose.connection;
// db.on('error', (err) => {
//     error('connection error:', err);
//     console.error('connection error:', err);
// }).once('open', () => { 
//     log('DB connection success!'); 
//     process.env.NODE_ENV != 'test' ? console.log('DB connection success!') : undefined;
// });
// function getUriFromDbConfig(dbConfig: {[key: string]: string}): string {
//     const {user, port, host, database} = dbConfig
//     let pass = dbConfig.password;
//     pass = (!pass || pass.length <= 0) ? '' : `:${pass}@`;
//     const uri = `mongodb://${user}${pass}${host}:${port}/${database}`
//     return uri;
// }
const mongoose = require("mongoose");
const connectionURL = 'mongodb://127.0.0.1:27017/epicureexe';
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
}), (() => {
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('connection error:', err);
}).once('open', () => {
    process.env.NODE_ENV != 'test' ? console.log('DB connection success!') : undefined;
});
//# sourceMappingURL=mongoose-init.js.map