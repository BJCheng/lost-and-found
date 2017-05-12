var mongoCollection = require('../models/mongoCollection');
var uuid = require('uuid');

let lostCollection;

function insertOne(info) {
    return mongoCollection.getLostCollection.then((collection) => {
        lostCollection = collection;
        info['_id'] = uuid();
        return lostCollection.insertOne(info);
    });
}

function insertCommentById(_id, comment) {
    return mongoCollection.getLostCollection.then((collection) => {
        lostCollection = collection;
        return lostCollection.update({ '_id': _id },
        {
        $push: { comments: comment }
        })
    });
}

function findLostById(_id){
    return mongoCollection.getLostCollection.then((collection)=>{
        return collection.findOne({'_id': _id});
    }).then((lost)=>{
        return lost;
    }).catch((err)=>{
        throw err;
    });
}

function findLosts(){
    return mongoCollection.getLostCollection.then((collection)=>{
        return collection.find({}).toArray();
    }).catch((err)=>{
        throw err;
    });
}

exports.insertOne = insertOne
exports.insertCommentById = insertCommentById;
exports.findLostById = findLostById;
exports.findLosts = findLosts