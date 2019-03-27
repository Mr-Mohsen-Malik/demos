import express from 'express';
import bodyParser from 'body-parser';
import dataRoute from './data/dataRoute'
import cors from 'cors';
const port = process.env.PORT || 4000;

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'));


app.use('/getData', dataRoute);


app.listen(port, () => {
    console.log('Node server listening on ', port);
});

module.exports = app;