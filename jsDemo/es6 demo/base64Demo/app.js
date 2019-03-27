const app = require('express')();
import bodyParser from 'body-parser';
import cors from 'cors';

import pdfRouter from './Pdf/pdf_routes';

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/pdf', pdfRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => {
    console.log(`Node server listening on --> ${port}`)
})