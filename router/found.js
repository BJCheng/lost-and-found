var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
const models = require("../models");
const foundModel = models.found;

router.get('/', (req, res)=>{
    foundModel.findFounds().then((found) => {
        res.render('found', { found: found, layout: false });
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});

router.get("/:id", (req, res) => {
    foundModel.findFoundById(req.params.id).then((found) => {
        res.render('found-detail', { found: found});
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});

router.post("/:id", (req, res) => {
    var commentorId = req.user._id;
    var now = new Date();
    var comment = {
        posterId: commentorId,
        comment: req.body.comment,
        timestamp: dateFormat(now, "UTC:dddd, mmmm dS, yyyy, h:MM:ss TT")
    }
    foundModel.insertCommentById(req.params.id, comment).then((found) => {
        res.render('found-detail', { found: found});
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});

router.post('/', (req, res)=>{
    var postArticle = {};
    postArticle.title = req.body.title;
    postArticle.description = req.body.description;
    postArticle.posterId = res.locals.user._id;
    postArticle.pic = "";
    postArticle.timestamp = dateFormat(new Date(), "UTC:dddd, mmmm dS, yyyy, h:MM:ss TT")
    postArticle.comments = [];
    postArticle.solved = false;

    foundModel.insertOne(postArticle).then((result)=>{
        res.redirect('/home?found=true');  //trigger found tab click event
    }).catch((err)=>{
        res.send(err)
    });
});


module.exports = router;