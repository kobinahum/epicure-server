var express = require('express');
var router = express.Router();


/**
 * @api {post} v1/resturant/
 * Create a Resturant
 * 
 * @apiVersion 0.1.0
 * @apiName Create Resturant
 * @apiGroup Resturant
 * 
 * @apiDescription Create a new Resturant.
 * 
 * 
 * 
 * 
 * @apiBody (New Resturant Details) {String} name
 * @apiBody (New Resturant Details) {String} cuisine
 * @apiBody (New Resturant Details) {Number} popular_score
 * @apiBody *Optional (New Resturant Details) {ObjectID} chef 
 * @apiBody *Optional (New Resturant Details) {Date} opening_date
 * @apiBody *Optional (New Resturant Details) {Date} opening_hours
 * @apiBody *Optional (New Resturant Details) {Date} closing_hours
 * @apiBody *Optional (New Resturant Details) {ObjectId[]} dishes
 * 
 * 
 * 
 * 
 * @apiBodyExample {json} Request-Example:
{
	"name":"Topolopompo",
	"cuisine":"Asian",
    "popular_score":4.2,
    
}
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "chef": "5d594a92e5a8fb0752a5367d",
    "opening_date": "2019-08-21T08:42:07.336Z",
    "opening_hours": "1970-01-01T07:00:01.900Z",
    "closing_hours": "1970-01-01T19:00:01.900Z",
    "dishes": [],
    "_id": "5d5d03e15579cb1f2b1fe74c",
    "name": "Topolopompo",
    "cuisine": "Asian",
    "popular_score": 4.2
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "name already exist"
 *     } 
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request-Validation Error
 *     {
 *        "status": 400,
 *         "error_custom_code": 7 
 *     } 
 * 



/**
 * @api {put} v1/resturant
 * 
 * @apiVersion 0.1.0
 * @apiName Edit Resturant By ID
 * @apiGroup Resturant
 * 
 * @apiDescription Edit Resturant By ID
 * 
 * 
 * @apiBody *Optional (New Resturant Details) {String} name
 * @apiBody *Optional (New Resturant Details) {String} cuisine
 * @apiBody *Optional (New Resturant Details) {Number} popular_score
 * @apiBody *Optional (New Resturant Details) {ObjectID} chef 
 * @apiBody *Optional (New Resturant Details) {Date} opening_date
 * @apiBody *Optional (New Resturant Details) {Date} opening_hours
 * @apiBody *Optional (New Resturant Details) {Date} closing_hours
 * @apiBody *Optional (New Resturant Details) {ObjectId[]} dishes
 * 
 * @apiParam {String} Resturant ID to edit
 * 
 * 
 * @apiBodyExample {json} Request-Example:
{
    "name": "Amore Mio",
    "cuisine": "Italian",
    "popular_score": 4.5
}
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 		{
 *   "chef": "5d594a92e5a8fb0752a5367d",
 *   "opening_date": "2019-08-19T06:57:40.377Z",
 *   "opening_hours": "1970-01-01T07:00:01.900Z",
 *   "closing_hours": "1970-01-01T19:00:01.900Z",
 *   "dishes": [],
 *   "_id": "5d5a48cdd063f509f2cc5455",
 *   "signature_dish": "5d5a53e8e9feec0a20579012",
 *   "name": "Amore Mio",
 *   "cuisine": "Italian",
 *   "popular_score": 4.5
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *       {
 *  "message": "Cast to ObjectId failed for value \"5d5a48cdd063f509f2cc545\" at path \"_id\" for model \"Resturant\"",
 *  "name": "CastError",
 *  "stringValue": "\"5d5a48cdd063f509f2cc545\"",
 *  "kind": "ObjectId",
 *  "value": "5d5a48cdd063f509f2cc545",
 *  "path": "_id"
 *     } 
 */
 
 
module.exports= router;