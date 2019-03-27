import conn         from "../db/db_Connection.js";
import resp         from "../utils/response.js";
import error_codes  from "../config/error_codes";
import logger       from '../common/logger.js'

let managerModel = {};

managerModel.getAllMembers = (req, res) => {

    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {

        let queryString = `SELECT * FROM users WHERE userType ='employee'`;

        if (req.body.type != 'manager') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }

        connection
            .query(queryString)
            .then(resultSet => {
                result.resultSet = resultSet.rows;
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({ meaagse: e.massage, stack: e.stack })
                result.error_codes = error_codes.INTERNAL_SERVER_ERROR;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

module.exports = managerModel;