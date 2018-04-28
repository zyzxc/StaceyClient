var express = require('express');
var router = express.Router();
var Captcha = require('svg-captcha');

router.get('/getCode', function (req, res, next) {
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    }
    var captcha = Captcha.create(codeConfig);
    res.setHeader('content-type', 'image/jpeg');
    res.send(captcha.data);
})

module.exports = router;
