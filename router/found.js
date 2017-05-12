var express = require('express');
var router = express.Router();
const models = require("../models");
const foundModel = models.found;

router.get('/', (req, res)=>{
    foundModel.findFounds().then((found) => {
        res.render('found', { found: found, layout: false });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;