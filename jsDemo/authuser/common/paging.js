const pageLength = require('../config/config').recordsPerPage.length;
import logger      from './logger.js';
import error_codes from "../config/error_codes.js";


module.exports = (page, rows) => {
    try {
        let totalPages = Math.ceil(rows.length / pageLength);
        let start = page * (pageLength-1);
        let end = start + pageLength;
        let records = [];
        let j = -1;

        for (let i = start; i < end; i++) {
            if(rows[i]== null)break;
            records[++j] = rows[i];
        }

        if (page <= totalPages) {
            return {
                currentPage: page,
                totalPages: totalPages,
                recordsPerPages: pageLength,
                records: records
            };
        }
        else {
            return {
                currentPage: page,
                totalPages: totalPages,
                recordsPerPages: pageLength,
                Error: error_codes.API_NOT_FOUND
            };
            
        }
    }
    catch (error) {
        logger.error({message :e.massage})
    }
}