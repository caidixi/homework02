let mysql = require("mysql");
let db = {};

//选择操作，注意使用异步返回查询结果
db.select = function (connection, sql) {
    return new Promise((resolve) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
            } else {
                resolve(result);
            }
        });
    }).catch(error => {
        console.log('caught', error.message);
    });

};

//插入操作
db.insert = function (connection, sql) {
    return new Promise((resolve) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
            } else {
                resolve(result);
            }
        });
    }).catch(error => {
        console.log('caught', error.message);
    });

};

db.close = function (connection) {
    //关闭连接
    connection.end(function (err) {
        if (err) {
        } else {
            console.log('关闭连接');
        }
    });
};

//获取数据库链接
db.connection = function () {
    //数据库配置
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "webProject",
        port: 3306
    });
    //数据库链接
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }
    });
    return connection;
};

module.exports = db;
