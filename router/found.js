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
    req.checkBody('comment', 'comment is empty').notEmpty();
        let errors = req.validationErrors();
    if (errors) {
        res.render('found-detail', { errors: errors });
    } else {
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
    }
});

router.post('/', (req, res)=>{
    req.checkBody('title', 'title is empty').notEmpty();
    req.checkBody('description', 'description is empty').notEmpty();
    req.checkBody('location', 'location is empty').notEmpty();
        let errors = req.validationErrors();
    if (!errors) {
        var article = {};
        article.title = req.body.title;
        article.description = req.body.description;
        article.posterId = res.locals.user._id;
        article.pic = "";
        article.location = req.body.location;
        article.timestamp = dateFormat(new Date(), "UTC:dddd, mmmm dS, yyyy, h:MM:ss TT")
        article.comments = [];
        article.solved = false;

        foundModel.insertOne(article).then((result)=>{
            res.redirect('home?found=true');  //trigger found tab click event
        }).catch((err)=>{
            res.send(err)
        });
    }
});

router.delete('/', (req, res)=>{
    foundModel.deleteById(req.body.articleId).then((result)=>{
        res.send({'redirect': '/home?found=true'});
    }).catch((err)=>{
        res.send(err)
    });
});


module.exports = router;