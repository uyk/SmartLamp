/**
 * Created by admin on 2016-11-15.
 */
var express = require('express');
var router = express.Router();

/* test Post. */
router.post('/test', function(req, res, next) {
    //res.render('test', { title: 'test' });
    console.log("test");
});

module.exports = router;