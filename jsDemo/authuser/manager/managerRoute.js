import express      from 'express';
import VerifyToken  from '../common/verifyToken.js';
import managerModel from "./managerModel.js";

let managerRoute = express.Router();

managerRoute.get('/getAllMembers', VerifyToken, (req, res) => {
    console.log("manager")
    managerModel.getAllMembers(req, res);
});


module.exports = managerRoute;