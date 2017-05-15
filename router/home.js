var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    if(req.query.found)
        return res.render('home', {'found':true});
    res.render('home');
});

module.exports = router;