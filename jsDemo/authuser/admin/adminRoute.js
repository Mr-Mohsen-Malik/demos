import express      from 'express';
import VerifyToken  from '../common/verifyToken.js';
import adminModel   from "./adminModel.js";

let adminRoute = express.Router();

adminRoute.post('/updateByAdmin', VerifyToken, (req, res) => {
    adminModel.updateByAdmin(req, res)
})

adminRoute.post('/insertByAdmin', VerifyToken, (req, res) => {
    adminModel.insertByAdmin(req, res)
})

adminRoute.get('/getAllManagers', VerifyToken, (req, res) => {
    adminModel.getAllManagers(req, res);
});

adminRoute.get('/getAllUsers', VerifyToken, (req, res) => {
    adminModel.getAllUsers(req, res);
});

adminRoute.get('/getAllMembers', VerifyToken, (req, res) => {
    adminModel.getAllEmployees(req, res);
});

adminRoute.get('/usersListWithPage', VerifyToken, (req, res) => {
    adminModel.usersListWithPage(req, res);
});

adminRoute.post('/updateUserType', VerifyToken, (req, res) => {
    adminModel.updateUserType(req, res);

});

adminRoute.post('/deleteUser', VerifyToken, (req, res) => {
    adminModel.deleteUser(req, res);
});



module.exports = adminRoute;