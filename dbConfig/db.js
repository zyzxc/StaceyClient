var mysql = require('mysql')

const dbconfig = {
    host: '120.27.224.108',
    port: '3306',
    user: "root",
    password: "root",
    database: "stacey"
};

var pool = mysql.createPool(dbconfig);

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
    
    var useDbSql = "USE stacey";
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error:" + err.message);
            return;
        }
        console.log("USE SUCCEED!");
    });
});

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbconfig);
    connection.connect(function (err) {
        if (err) {
            console.log("进行断线重连：" + new Date());
            setTimeout(handleDisconnect, 2000);   //2秒重连一次
            return;
        }
        console.log("连接成功");
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

exports.connection = handleDisconnect;
exports.pool = pool;