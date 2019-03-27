const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const DB = require('./config/config').db;



(async function () {
    let client;
    let result;

    try {
        client = await MongoClient.connect(DB.url, { useNewUrlParser: true });
        console.log("Connected correctly to server");
        const db = client.db(DB.name);
        const col =await db.collection(DB.colName)

        result = await col.updateOne({ token: "$2a$08$rBD3iRDxuOAi7oT3nmFJkOMXyt8sRG7pSaTAueZ3NBq4i9QUb2eMi" }, { $set: { active: false } });
        assert.equal(1,result.matchedCount);

    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    client.close();
})();
















// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');

// // Connection URL
// var url = 'mongodb://localhost:27017/wiitybrains';
// // Use connect method to connect to the Server
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//     db.collection('users').update({ name: "name" }, { email: "someEmail" }, function (err, result) {
//         assert.equal(null, err);
//         assert.equal(1, result);
//     });
//     db.close();
// });

// // const mongoose = require('mongoose');

// // mongoose.connect('mongodb://localhost/wittybrains', { useNewUrlParser: true });
// // var Schema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, unique: true },
// //     password: { type: String, required: true },
// // });
// // var User = mongoose.model("users", Schema, "users");

// // User.find({ name: /^m/ }, (err, doc) => { console.log(doc) });
