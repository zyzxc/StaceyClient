var express = require('express');
var router = express.Router();
var Goods = require("../models/Goods/goods");

router.get('/getGoodsList', function (req, res, next) {
    Goods.getGoodsList(function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err.message,
                result: result
            })
            return;
        }
        if (result) {
            res.json({
                code: 0,
                msg: [],
                result: result,
                total: result.length
            })
        } else {
            res.json({
                code: -1,
                msg: err.message,
                result: []
            })
        }
    })
});
router.get('/getUserCart', function (req, res, next) {
    Goods.getUserCart("zxc123", function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err.message,
                result: []
            })
            return;
        }
        if (!result) {
            return;
        }
        if (result) {
            var cartList = {};
            result.forEach(function (item, index) {
                Goods.getInfoById(item["goodsId"], function (err1, goods) {
                    if (err1) {
                        return;
                    }
                    if (!goods) {
                        return;
                    }
                    cartList["list"] = goods;
                    goods.forEach(function (itm, index1) {
                        itm["count"] = item["count"];
                        cartList["totalHoney"] = item["count"] * itm["price"];
                        Goods.getGiftsById(itm["giftsId"], function (err2, gift) {
                            if (err2) {
                                console.log("Gifts Error:" + JSON.stringify(err2));
                                return;
                            }
                            if (!gift) {
                                return;
                            }
                            itm["gifts"] = gift;
                            console.log("cartList:" + JSON.stringify(cartList));
                        })
                    })
                })
            })

            var internal = setInterval(function () {
                if (JSON.stringify(cartList).length > 0) {
                    res.json({
                        code: 0,
                        msg: [],
                        result: cartList
                    });
                    clearInterval(internal)
                }
            }, 100)
        }
    })
})

module.exports = router;