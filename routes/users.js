var express = require('express');
var router = express.Router();
var User = require("../models/User/user");

//获取全部用户信息
router.get('/getUsetList', function (req, res, next) {
    User.getUserList(function (err, result) {
        if (err) {
            console.log("Error:" + JSON.stringify(err));
            res.json({
                code: -1,
                msg: err,
                result: []
            });
            return;
        }
        console.log(JSON.stringify(result));
        res.json({
            code: 0,
            msg: [],
            result: result
        });
    })
});

router.post('/doLogin', function (req, res, next) {
    var username = req['body']['username'];
    var password = req['body']['password'];
    User.getUserByUserName(username, function (err, result) {
        if (err) {
            console.log("Error :" + JSON.stringify(err));
            res.json({
                code: -1,
                msg: err,
                result: []
            });
            return;
        }
        console.log(JSON.stringify(result));
        res.json({
            code: 0,
            msg: [],
            result: result
        });
    })
});

module.exports = router;
