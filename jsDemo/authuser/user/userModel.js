import conn        from "../db/db_Connection.js";
import resp        from "../utils/response.js";
import jwt         from 'jsonwebtoken';
import config      from "../config/config.js";
import error_codes from "../config/error_codes";
import logger      from '../common/logger.js'
import notify      from '../common/notifyUser'

let userModel = {};


userModel.register = (req, res, next) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        let queryString = `insert into users (name,email,userType,password,token,address,contact,gender) 
                                values ('${req.body.name}', '${req.body.email}', '${req.body.userType}', '${req.body.password}', '${req.body.token}', '${req.body.address}', '${req.body.contact}', '${req.body.gender}')`
        connection
            .query(queryString)
            .then(() => {
                resp.sendResponse(req, res, result, connection);
                setTimeout(userModel.filter, 60 * 60 * 1000);
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

userModel.verifyEmail = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        let queryString = `UPDATE users 
                                SET active =  'true',token=''
                                WHERE token = '${req.query.id}'
                                RETURNING *`;

        connection
            .query(queryString)
            .then(resultSet => {
                resp.sendResponse(req, res, result, connection);
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

userModel.login = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;
    conn.getCon((connection) => {
        let queryString = `SELECT * 
                                FROM users 
                                WHERE email = '${req.body.email}' AND active = true `;

        connection
            .query(queryString)
            .then(resultSet => {
                if (req.body.password != resultSet.rows[0].password) {
                    result.error_codes = error_codes.API_NOT_FOUND;
                    return resp.sendResponse(req, res, result, connection);
                }
                let token = jwt.sign({ type: resultSet.rows[0].usertype, email: resultSet.rows[0].email },
                    config.secret.secret,
                    { expiresIn: '1h' });
                result.token = token;
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.stack})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

userModel.updateProfile = (req, res) => {
    let result = {};
    let user={};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        let name, password, address, contact, gender;
        let queryString = `SELECT * 
                            FROM users
                            WHERE email = '${req.body.email2}'`;
        connection
            .query(queryString)
            .then(resultSet => {
                name = req.body.name || resultSet.rows[0].name;
                password = req.body.password || resultSet.rows[0].password;
                address = req.body.address || resultSet.rows[0].address;
                contact = req.body.contact || resultSet.rows[0].contact;
                gender = req.body.gender || resultSet.rows[0].gender;
                user.name=name;
                user.email=resultSet.rows[0].email;
                user.about=config.noti.profile;
                queryString = `UPDATE users 
                                SET (name,password,address,contact,gender) =('${name}', '${password}', '${address}', '${contact}', '${gender}')
                                WHERE email = '${req.body.email2}'
                                RETURNING *`;
                connection
                    .query(queryString)
                    .then(resultSet => {
                        notify(user)
                        resp.sendResponse(req, res, result, connection)
                    })
                    .catch(e => {
                        logger.error({message :e.massage})
                        result.error_codes = error_codes.CONFLICT;
                        resp.sendResponse(req, res, result, connection);
                    });
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });

}

userModel.updatePassword = (req, res) => {
    
    let result = {};
    let user={};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {
        let name, password, address, contact, gender;
        let queryString = `SELECT * 
                            FROM users
                            WHERE email = '${req.body.email2}'`;
                            
        connection
            .query(queryString)
            .then(resultSet => {
               user.name=resultSet.rows[0].name;
               user.email=resultSet.rows[0].email;
               user.about=config.noti.pass;

                password = req.body.password || resultSet.rows[0].password;
                
                queryString = `UPDATE users 
                                SET password ='${password}'
                                WHERE email = '${req.body.email2}'
                                RETURNING *`;
                connection
                    .query(queryString)
                    .then(resultSet => {
                        
                        notify(user)
                        console.log("updatePassword => ", req.body.password)
                        resp.sendResponse(req, res, result, connection)
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
    });

}

userModel.viewSelf = (req, res) => {
    let result = {};
    result.error_codes = error_codes.SUCCESS;

    conn.getCon((connection) => {

        let queryString = `SELECT * 
                            FROM users
                            WHERE email = '${req.body.email2}'`;

        connection
            .query(queryString)
            .then(resultSet => {
                result.resultSet = resultSet.rows;
                resp.sendResponse(req, res, result, connection)
            })
            .catch(e => {
                logger.error({message :e.massage})
                result.error_codes = error_codes.CONFLICT;
                resp.sendResponse(req, res, result, connection);
            });
    });
}

userModel.filter = () => {
    conn.getCon((connection) => {
        let queryString = `DELETE 
                            FROM users 
                            WHERE active = 'false'
                            RETURNING *`;
        connection
            .query(queryString)
            .then(resultSet => {
                connection.release();
            })
            .catch(e => logger.error({message :e.massage}));
    });
}

module.exports = userModel;
