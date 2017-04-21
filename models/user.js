var mongoCollection = require('../models/mongoCollection');
var uuid = require('uuid');

let userCollection;

function insertOne(info) {
    return mongoCollection.getUserCollection.then((collection) => {
        userCollection = collection;
        return userCollection.findOne({ email: info.email })
    }).then((user)=>{
        if(user)
            throw('E-mail Address already registered.');
        
        info['_id'] = uuid();
        info['messageReceive'] = [];
        info['messageSent'] = [];
        return userCollection.insertOne(info);
    });
}

function receiveMessage(){
    //push the MessageReceive subdocument into user document
}
function sendMessage(){
    //push the MessageSent subdocument into user document
}

exports.insertOne = insertOne
exports.receiveMessage = receiveMessage
exports.sendMessage = sendMessage