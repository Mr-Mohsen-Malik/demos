import assert from 'assert';
import client from '../db/db_connection';
import error_codes from '../config/error_codes';
import resp from '../utils/response';

let loginModel = {};

loginModel.login = async (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;
    let query = {
        'email': req.body.email,
        'password': req.body.password,
        'active': true
    }
    try {
        let db = await client();
        let col = db.collection('users');

        col.find(query)
            .toArray((err, doc) => {
                // console.log("error",err)
                if (doc.length != 1) {
                    result.error_codes = error_codes.API_NOT_FOUND;
                    return resp.sendResponse(req, res, result, db);
                }
                else {
                    return resp.sendResponse(req, res, result, db);
                }
            })
    }
    catch (error) {
        result.error_codes = error_codes.CONFLICT;
        console.log("error", error.message);
        return resp.sendResponse(req, res, result, db);
    }
}
module.exports = loginModel;