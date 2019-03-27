import express from'express';
import bodyParser from'body-parser';
import routes from './server/route/route.js';
const port = process.env.PORT || 4000;

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client'));

app.use('/', routes);

app.listen(port, () => {
    console.log('Node server listening on ', port);
});

module.exports = routes;

