const mongodb = require('mongodb');
const URL_MONGO_DB = "mongodb+srv://sa:devanhduy@test1-evwhi.mongodb.net/test1?retryWrites=true&w=majority";
const MongoClient = mongodb.MongoClient;

const connecting_db = (callback) => {
    MongoClient.connect(URL_MONGO_DB, { useUnifiedTopology: true })
}

module.exports = connecting_db;