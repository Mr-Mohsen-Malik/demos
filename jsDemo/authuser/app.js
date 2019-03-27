import express       from 'express';
import bodyParser    from 'body-parser';
import adminRoutes   from './admin/adminRoute.js';
import managerRoutes from './manager/managerRoute.js';
import userRoutes    from './user/userRoute.js';
import logger        from './common/logger.js'

const port = process.env.PORT || 4000;

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client'));


app.use('/admin'  , adminRoutes);
app.use('/manager', managerRoutes);
app.use('/user'   , userRoutes);

app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    let resultStr = JSON.stringify("Hello World!");
    res.write(resultStr);
    res.end();
});


app.listen(port, () => {
    logger.info({ message: 'Node server listening on ' + port });
});

module.exports = app;