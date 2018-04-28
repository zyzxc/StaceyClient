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
    User.getUserByUserName = function getUserByUserName(username, callback) {
        console.log(username);
        var getUserByUserNameSql = "SELECT * FROM user WHERE code=?";
        connection.query(getUserByUserNameSql, [username], function (err, result) {
            if (err) {
                return;
            }
            callback(err, result);
        })
    }

    User.getUserInfoByEmail = function (email, callback) {
        var getInfoByEmailSql = "SELECT * FROM user WHERE email=?";
        connection.query(getInfoByEmailSql, [email], function (err, result) {
            if (err) {
                return;
            }
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
    User.delUserById = function (userId, callback) {
        var delUserByIdSql = "DELETE FROM user WHERE userId=?";
        connection.query(delUserByIdSql, [userId], function (err, result) {
            if (err) {
                return;
            }
            callback(err, result);
        })
    }
    User.updateUserById = function (userId, callback) {
        //var updateUserByIdSql="UPDATE user ";
    }
})