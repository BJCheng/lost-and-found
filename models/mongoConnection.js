var mongodb = require('mongodb').MongoClient;

const mongodbConfig = {
    'serverUrl': 'mongodb://cgu:cgusamuel@ds159200.mlab.com:59200/',
    'database': 'cgu_lost_and_found'
}

let url = mongodbConfig.serverUrl + mongodbConfig.database;
let connection = undefined;

let dbPromise = () => {
    if (!connection)
        connection = mongodb.connect(url);
 
    return connection;
}

exports.connect = dbPromise;