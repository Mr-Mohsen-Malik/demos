import jwt         from 'jsonwebtoken';
import config      from '../config/config';
import resp        from "../utils/response";
import error_codes from "../config/error_codes";

function verifyToken(req, res, next) {
  
  let token = req.headers['x-access-token'];
  let result = {};
  if (!token) {
    result.error_codes = error_codes.UNAUTHORIZED;
    return resp.sendResponse(req, res, result);
  }
  
  jwt.verify(token, config.secret.secret, (err, decoded) => {
    if (err) {
      result.error_codes = error_codes.UNAUTHORIZED;
      return resp.sendResponse(req, res, result);
    }
    req.body.type = decoded.type;
    req.body.email2 = decoded.email;
    next();
  });
}
module.exports = verifyToken;