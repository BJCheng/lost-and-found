var express = require('express');
var router = express.Router();
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
        res.render('found-detail', { found: found });
    }).catch(() => {
        res.status(404).json({ error: "Data not found" });
    });
});


module.exports = router;