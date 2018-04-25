var dbConfig = require("../../dbConfig/db");
var async = require("async");

function Goods(good) {
    this.goodsId = good.goodsId;
    this.goodsName = good.goodsName;
    this.goodsCode = good.goodsCode;
    this.price = good.price;
    this.amount = good.amount;
    this.imgUrl = good.imgUrl;
    this.giftsId = good.giftsId;
}

module.exports = Goods;

dbConfig.pool.getConnection(function (err, connection) {
    /*var useDbSql = "USE stacey";
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error:" + err.message);
            return;
        }
        console.log("USE SUCCEED!");
    });*/

    Goods.getGoodsList = function getGoodsList(callback) {
        var getGoodsListSql = "SELECT * FROM goods";
        connection.query(getGoodsListSql, function (err, result) {
            if (err) {
                console.log("getGoodsList Error:" + err.message);
                return;
            }
            console.log(JSON.stringify(result));
            callback(err, result);
        })
    }

    Goods.getUserCart = function getUserCart(userId, callback) {
        var getUserCartSql = "SELECT * FROM carts WHERE userId=?";
        connection.query(getUserCartSql, [userId], function (err, result) {
            if (err) {
                console.log("getUserCart Error :" + err.message);
                return;
            }
            if (!result) {
                return;
            }
            console.log("Carts :" + JSON.stringify(result));
            callback(err, result);
        })
    }

    Goods.getInfoById = function getInfoById(goodsId, callback) {
        var getByIdSql = "SELECT * FROM goods WHERE goodsId=?";
        connection.query(getByIdSql, [goodsId], function (err, result) {
            if (err) {
                return;
            }
            if (!result) {
                return;
            }
            console.log("Goods Info :" + JSON.stringify(result));
            callback(err, result);
        })
    }
    Goods.getGiftsById = function getGiftsById(giftId, callback) {
        var getGiftById = "SELECT * FROM gifts WHERE giftId=?";
        connection.query(getGiftById, [giftId], function (err, result) {
            if (err) {
                return;
            }
            console.log("Gifts :" + JSON.stringify(result));
            callback(err, result);
        })
    }
})