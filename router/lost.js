var express = require('express');
var router = express.Router();
const models = require("../models");
const lostModel = models.lost;

router.get('/', (req, res)=>{
    lostModel.findLosts().then((lost) => {
        res.render('lost', { lost: lost, layout: false });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;