import fs from 'fs';
import path from 'path';

import errorCodes from '../config/error_codes';
let pfdModel = {};

pfdModel.getPdf = async (req, res) => {
    let result = {};
    result.error_codes = errorCodes.SUCCESS;
    try {
        var pdfscr = path.join(__dirname, '../output.pdf');
        let data = await fs.readFileSync(pdfscr);
        const pdf = data.toString('base64');
        res.send(pdf)
    }
    catch (error) {
        console.log(error.message);
        result.error_codes = errorCodes.INTERNAL_SERVER_ERROR;
        res.end(result);
    }
}

export default pfdModel;