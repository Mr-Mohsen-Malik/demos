import express from 'express';

import sendVerifyLink from '../common/sendVerifyLink';
import registerModel from "./registerModel";

let registerRoute = express.Router();

registerRoute.post('/', sendVerifyLink, (req, res) => {
    registerModel.register(req, res);
});
registerRoute.get('/verifyEmail', (req, res) => {
    registerModel.verifyEmail(req, res);
});

module.exports = registerRoute;