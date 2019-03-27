import assert from 'assert';
import client from '../db/db_connection';
import error_codes from '../config/error_codes';
import resp from '../utils/response';

let registerModel = {};

registerModel.register = async (req, res) => {
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        active: false
    };

    let result = {};
    result.error_codes = error_codes.SUCCESS;
    try {
        let db = await client();
        let col = db.collection('users');
        col.find({ email: req.body.email })
            .toArray((err, doc) => {
                if (doc.length !== 0) {
                    result.error_codes = error_codes.CONFLICT;
                    return resp.sendResponse(req, res, result, db);
                }
                else {
                    col.insertOne(newUser);
                    return resp.sendResponse(req, res, result, db);

                }
            })
    }
    catch (error) {
        result.error_codes = error_codes.CONFLICT;
        return resp.sendResponse(req, res, result, db);
    }
}

registerModel.verifyEmail = async (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    let update = {
        $set: {
            active: true,
            token: ''
        }
    }
    let query = {
        token: req.query.id
    }
    try {
        let db = await client();
        let col = db.collection('users');

        col.findOneAndUpdate(query, update, (err, doc) => {
            if (doc.lastErrorObject.updatedExisting == true) {
                return resp.sendResponse(req, res, result, db);
            }
            else {
                result.error_codes = error_codes.CONFLICT;
                return resp.sendResponse(req, res, result, db);
            }
        });
    }
    catch (error) {
        result.error_codes = error_codes.CONFLICT;
        return resp.sendResponse(req, res, result, db);
    }
}

module.exports = registerModel;
