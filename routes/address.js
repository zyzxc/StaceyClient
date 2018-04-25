var express = require('express');
var router = express.Router();
var Address = require("../models/Address/address")

router.get('/getAddressList', function (req, res, next) {
    Address.getAddressList(function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err,
                result: []
            })
            return;
        }
        console.log(JSON.stringify(result));
        if (result) {
            result.forEach(function (item, index) {
                item["isDefault"] = item["isDefault"] == 1 ? true : false;
            });
            res.json({
                code: 0,
                msg: [],
                result: result,
                total: result.length
            })
        } else {
            res.json({
                code: -2,
                msg: [],
                result: [],
                total: 0
            })
        }
    })
})

module.exports = router;