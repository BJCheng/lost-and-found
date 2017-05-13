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

router.get("/:id", (req, res) => {
    lostModel.findLostById(req.params.id).then((found) => {
        res.render('lost-detail', { found: found });
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});

module.exports = router;