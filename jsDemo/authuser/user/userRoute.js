import express from 'express';

import VerifyToken from '../common/verifyToken.js';
import sendVerifyLink from "../common/sendVerifyLink.js";
import userModel from "./userModel.js";

let userRoute = express.Router();

userRoute.get('/viewSelf', VerifyToken, (req, res) => {
    userModel.viewSelf(req, res);
});

userRoute.post('/register', sendVerifyLink, (req, res) => {
    userModel.register(req, res);
});

userRoute.get('/verifyEmail', (req, res) => {
    userModel.verifyEmail(req, res);
});

userRoute.post('/login', (req, res) => {
    userModel.login(req, res);
});

userRoute.post('/updateProfile', VerifyToken, (req, res) => {
    userModel.updateProfile(req, res);
});

userRoute.post('/updatePassword', VerifyToken, (req, res) => {
    userModel.updatePassword(req, res);
});

module.exports = userRoute;