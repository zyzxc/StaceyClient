var dbConfig = require("../../dbConfig/db");

function User(user) {
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.sex = user.sex;
    this.tel = user.tel;
    this.qq = user.qq;
    this.weixin = user.weixin;
    this.weibo = user.weibo;
    this.email = user.email;
    this.code = user.code;
    this.date = user.date;
    this.islive = user.islive;
}

module.exports = User;

dbConfig.pool.getConnection(function (err, connection) {
    /*var useDbSql = "USE stacey";
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error:" + err.message);
            return;
        }
        console.log("USE SUCCEED!");
    });*/
    User.getUserByUserName = function getUserByUserName(username, callback) {
        console.log(username);
        var getUserByUserNameSql = "SELECT * FROM user WHERE code=?";
        connection.query(getUserByUserNameSql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error :" + err.message);
                return;
            }
            console.log("getUserByUserName Result :" + result);
            callback(err, result);
        })
    }

    User.getUserList = function getUserList(callback) {
        var getUserListSql = "SELECT * FROM user";
        connection.query(getUserListSql, function (err, result) {
            if (err) {
                console.log("getUserList Error :" + err.message);
                return;
            }
            console.log("getUserList Succees :" + JSON.stringify(result));
            callback(err, result);
        })
    }
})