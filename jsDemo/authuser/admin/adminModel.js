import conn        from "../db/db_Connection.js";
import resp        from "../utils/response.js";
import error_codes from "../config/error_codes.js";
import logger      from '../common/logger.js';
import notify      from '../common/notifyUser'
import config      from "../config/config.js";
import paging      from "../common/paging";

let adminModel = {};

adminModel.usersListWithPage = (req, res) => {
    let page = req.query.page;
    let result = {};
    result.error_codes = error_codes.SUCCESS;
    
    conn.getCon((connection) => {
        let queryString = `SELECT * FROM users ORDER BY usertype`;
        if (req.body.type != 'admin') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }
        connection
            .query(queryString)
            .then(resultSet => {
                result.resultSet =paging(page, resultSet.rows);
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.INTERNAL_SERVER_ERROR;
                resp.sendResponse(req, res, result, connection);
            });



    })
}

adminModel.getAllEmployees = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        let queryString = `SELECT * FROM users WHERE userType ='employee'`;

        if (req.body.type != 'admin') {
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
                logger.error({message :e.massage})
                result.error_codes = error_codes.INTERNAL_SERVER_ERROR;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

adminModel.getAllManagers = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        if (req.body.type != 'admin') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }
        
        let queryString = `SELECT * FROM users WHERE userType ='manager'`;

        connection
            .query(queryString)
            .then(resultSet => {
                result.resultSet = resultSet.rows;
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.INTERNAL_SERVER_ERROR;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

adminModel.getAllUsers = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        if (req.body.type != 'admin') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }

        let queryString = 'SELECT * FROM users';

        connection
            .query(queryString)
            .then(resultSet => {
                result.resultSet = resultSet.rows;
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.INTERNAL_SERVER_ERROR;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

adminModel.deleteUser = (req, res) => {
    let result = {};
    let user = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        if (req.body.type != 'admin') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }

        let queryString = `DELETE 
                                FROM users 
                                WHERE email = '${req.body.email}'
                                RETURNING *`
        user.name = 'user';
        user.email = req.body.email;
        user.about = config.noti.delete;

        connection
            .query(queryString)
            .then(resultSet => {
                notify(user);
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

adminModel.updateUserType = (req, res) => {
    let result = {};
    let user = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        if (req.body.type != 'admin') {
            result.error_codes = error_codes.UNAUTHORIZED;
            return resp.sendResponse(req, res, result, connection);
        }
        let queryString = `UPDATE users 
                                SET usertype = '${req.body.userType}'
                                WHERE email = '${req.body.email}'
                                RETURNING *`;
        user.name = 'user';
        user.email = req.body.email;
        user.about =config.noti.userType ;

        connection
            .query(queryString)
            .then(resultSet => {
                notify(user);
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

adminModel.insertByAdmin = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;
    var promise = new Promise( (resolve, reject)=> {
        try {
            conn.getCon((connection) => {
                if (req.body.type != 'admin') {
                    result.error_codes = error_codes.UNAUTHORIZED;
                    return resp.sendResponse(req, res, result, connection);
                }
                for (let x = 0; x < req.body.length; x++) {
                    let queryString = `insert 
                                       into users (name,email,userType,password,active,address,contact,gender) 
                                       values ('${req.body[x].name}', '${req.body[x].email}', '${req.body[x].userType}', '${req.body[x].password}', '${req.body[x].active}', '${req.body[x].address}', '${req.body[x].contact}', '${req.body[x].gender}')`;

                    connection
                        .query(queryString)
                        .then(() => {
                            // if (x == req.body.length - 1) {
                            //     resp.sendResponse(req, res, result, connection)
                            // }
                        })
                        .catch(e => {
                            logger.error({message :e.stack});
                            result.error_codes = error_codes.CONFLICT;
                            resp.sendResponse(req, res, result, connection);
                        });
                }
                return resolve(connection);
            })
        }
        catch (e) { return reject(e) }
    })
    promise
        .then((connection) => { resp.sendResponse(req, res, result, connection) })
        .catch(e => {
            logger.error({message :e.stack});
        })
    // .then(resp.sendResponse(req, res, result, connection))
}

adminModel.updateByAdmin = (req, res) => {
    let result = {};
    let user = {}
    result.error_codes = error_codes.SUCCESS;

    var promise = new Promise( (resolve, reject) =>{

        try {
            conn.getCon((connection) => {

                if (req.body.type != 'admin') {
                    result.error_codes = error_codes.UNAUTHORIZED;
                    return resp.sendResponse(req, res, result, connection);
                }

                let name, active, userType, address, contact, gender;

                for (let x = 0; x < req.body.length; x++) {
                    let queryString = `SELECT * 
                                    FROM users
                                    WHERE email = '${req.body[x].email}'`;
                
                    connection
                        .query(queryString)
                        .then(resultSet => {
                            name = req.body[x].name || resultSet.rows[0].name;
                            userType = req.body[x].userType || resultSet.rows[0].userType;
                            address = req.body[x].address || resultSet.rows[0].address;
                            contact = req.body[x].contact || resultSet.rows[0].contact;
                            gender = req.body[x].gender || resultSet.rows[0].gender;
                            active = req.body[x].active || resultSet.rows[0].active;
                            user.name = name;
                            user.email = req.body[x].email;
                            user.about = config.noti.profile;
                            queryString = `UPDATE users 
                                        SET (name,usertype,active,address,contact,gender) =('${name}', '${userType}','${active}', '${address}', '${contact}', '${gender}')
                                        WHERE email = '${req.body[x].email}'
                                        RETURNING *`;

                            connection
                                .query(queryString)
                                .then(()=>{
                                    notify(user)
                                })
                                .catch(e => {
                                    logger.error({message :e.stack})
                                    result.error_codes = error_codes.CONFLICT;
                                    resp.sendResponse(req, res, result, connection);
                                });
                        })
                        .catch(e => {
                            logger.error({message :e.stack})
                            result.error_codes = error_codes.CONFLICT;
                            resp.sendResponse(req, res, result, connection);
                        });
                }
                return resolve(connection)
            })
        }
        catch (e) {
            return reject(e);
        }
    })
    promise
        .then((connection) => { resp.sendResponse(req, res, result, connection) })
        .catch(e => {
            logger.error({message :e.stack})
        });
}


module.exports = adminModel;