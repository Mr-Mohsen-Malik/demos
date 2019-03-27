const MongoClient = require('mongodb').MongoClient;
import assert from 'assert';

import dbCred from './db_credentials';

module.exports = async function () {
    try {
        let client = await MongoClient.connect(dbCred.url, { useNewUrlParser: true });
        let db = await client.db(dbCred.name);
        console.log("Connection established. ");

        db.close = () => {
            client.close();
            console.log("Connection closed.")
        }
        return db;
    }
    catch (e) {
        assert.ifError(e);
    }
}
