var mongoCollection = require('../models/mongoCollection');
var uuid = require('uuid');

let userCollection;

function insertOne(info) {
    return mongoCollection.getUserCollection.then((collection) => {
        userCollection = collection;
        return userCollection.findOne({ email: info.email });
    }).then((user)=>{
        if(user)
            throw('E-mail Address already registered.');
        
        info['_id'] = uuid();
        info['messageReceive'] = [];
        info['messageSent'] = [];
        return userCollection.insertOne(info);
    });
}

function findUserByNameOrEmail(userNameOrEmail){
    return mongoCollection.getUserCollection.then((collection)=>{
        return collection.findOne({email: userNameOrEmail});
    }).then((user)=>{
        return user;
    }).catch((err)=>{
        throw err;
    });
}

function confirmPassword(user, receivingPassword){
    //TODO use bcrypt
    return mongoCollection.getUserCollection.then((collection)=>{
        return collection.findOne({email:user.email});
    }).then((user)=>{
        if(user.pwd === receivingPassword)
            return user;
        return null;
    }).catch((err)=>{
        throw err;
    });
}

function receiveMessage(){
    //push the MessageReceive subdocument into user document
}
function sendMessage(){
    //push the MessageSent subdocument into user document
}

exports.insertOne = insertOne
exports.findUserByNameOrEmail = findUserByNameOrEmail;
exports.confirmPassword = confirmPassword;
exports.receiveMessage = receiveMessage
exports.sendMessage = sendMessage