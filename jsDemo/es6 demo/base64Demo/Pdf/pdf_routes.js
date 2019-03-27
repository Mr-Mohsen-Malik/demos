const pdfRouter = require('express').Router();

import pdfModel from './pdf_models';

pdfRouter.get('/getPdf', (req, res) => {
    pdfModel.getPdf(req, res);
})

export default pdfRouter;