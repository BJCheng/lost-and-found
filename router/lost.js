var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
const models = require("../models");
const lostModel = models.lost;

router.get('/', (req, res)=>{
    lostModel.findLosts().then((lost) => {
        res.render('lost', { lost: lost, layout: false });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

router.get("/:id", (req, res) => {
    lostModel.findLostById(req.params.id).then((lost) => {
        res.render('lost-detail', { lost: lost });
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
    lostModel.insertCommentById(req.params.id, comment).then((lost) => {
        res.render('lost-detail', { lost: lost});
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});

module.exports = router;