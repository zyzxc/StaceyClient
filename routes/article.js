var express = require('express');
var router = express.Router();
var Article = require("../models/Article/article")

router.get('/getArticleList', function (req, res, next) {
    Article.getArticleList(function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err.message,
                result: []
            });
            return;
        }
        res.json({
            code: 0,
            msg: [],
            result: result
        })
    })
});
module.exports = router;