"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanObject(doc) {
    var obj = doc;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}
exports.cleanObject = cleanObject;
//# sourceMappingURL=genericFunctions.js.map