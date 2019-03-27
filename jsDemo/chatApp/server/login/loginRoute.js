import express from 'express';

import loginModel from "./loginModel";

let loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
    loginModel.login(req, res);
});

module.exports = loginRoute;