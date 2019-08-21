"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// ReMap<M, (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string}>; //{ [key in keyof M]: (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string} }
/**
 * @description create mongoose scheme from 'schemaBlueprint' & 'options', and assign the 'methods' to the scheme.methods field,
 *  using 'Object.assign' (not override the existing content).
 *
 * @param schemaBlueprint scheme definition wrapped in 'StrongSchema' interface.
 * @param methods additional model methods
 * @param options mongoose native schema options
 */
function createStrongSchema(schemaBlueprint, methods, options) {
    const schema = new mongoose_1.Schema((schemaBlueprint), options);
    schema.methods = Object.assign(schema.methods, methods);
    return schema;
}
exports.createStrongSchema = createStrongSchema;
//# sourceMappingURL=index.js.map