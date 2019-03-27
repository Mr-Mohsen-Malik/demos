import express from 'express';
import dataModel from "./dataModel.js";

let dataRoute = express.Router();

dataRoute.get('/', (req, res) => {
    dataModel.getData(req, res)
})

dataRoute.get('/id', (req, res) => {
    dataModel.getDataById(req, res)
})

dataRoute.get('/name', (req, res) => {
    dataModel.getDataByName(req, res)
})
module.exports = dataRoute;