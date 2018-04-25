var dbConfig = require("../../dbConfig/db");

function Address(address) {
    this.addressId = address.addressId;
    this.userName = address.userName;
    this.streetName = address.streetName;
    this.postCode = address.postalCode;
    this.tel = address.tel;
    this.isDefault = address.isDefault;
}

module.exports = Address;

dbConfig.pool.getConnection(function (err, connection) {
    /*var useDbSql = "USE stacey";
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error:" + err.message);
            return;
        }
        console.log("USE SUCCEED!");
    });*/

    Address.getAddressList = function getAddressList(callback) {
        var getAddressListSql = "SELECT * FROM address";
        connection.query(getAddressListSql, function (err, result) {
            if (err) {
                console.log("getAddressList Error :" + err);
                return;
            }
            console.log(JSON.stringify(result));
            callback(err, result);
        })
    }
})