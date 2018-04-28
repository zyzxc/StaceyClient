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
            console.log('[LOGIN ERROR] -- ', err.message);
            res.json({code: -1, msg: [{content: "登录失败！"}]});
            res.render('login', {title: '登录'});
            return;
        }
        if (result[0].code != username || result[0].password != password) {
            res.render('login', {title: '登录'});
            res.json({code: -1, msg: [{content: "用户名或密码错误！"}]});
            console.log("login err:>>用户名或密码错误！");
            return;
        } else {
            console.log("恭喜" + result[0].name + "登录成功！");
            res.json({code: 0, msg: [{content: "登录成功！"}], result: result});
            return;
        }
    })
});

router.post('/delUserById', function (req, res, next) {
    User.delUserById(req['body']['userId'], function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: [{content: '删除失败！'}],
                result: []
            })
            return;
        }
        res.json({
            code: 0,
            msg: [],
            result: result
        })
    })
})

module.exports = router;
