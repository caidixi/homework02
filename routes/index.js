let express = require('express');
let router = express.Router();
let db = require("../module/db");

/* 登陆. */
router.post('/user/login', async function (req, res/*, next*/) {
    let username = req.body.username;
    let password = req.body.password;
    console.log('接收到登陆请求');
    console.log('username:'+username + ' password:' + password);

    let sqlString = 'SELECT * FROM user';
    let connection = db.connection();
    let users = await db.select(connection, sqlString);
    for (let i = 0; i < users.length; i++) {
        let aName = users[i].username;
        let aPassword = users[i].password;
        if(aName === username){
            if(aPassword===password){
                return res.send({
                    'state': 0,
                    'url': '/show.html'
                });
            }
        }
    }
    return res.send({
        'state': 1,
        'url': ''
    });
});

/* 注册 */
router.post('/user/register', async function (req, res/*, next*/) {
    let username = req.body.username;
    let password = req.body.password;
    console.log('接收到注册请求');
    console.log('username:'+username + ' password:' + password);

    let selectSqlString = 'SELECT * FROM user where username = \''+ username+'\'';
    let connection = db.connection();
    let user = await db.select(connection, selectSqlString);
    if(user.length === 0){
        let insertSqlString = 'insert into user(username,password) values (\"'+ username+'\",\"' + password +'\")' ;
        console.log(insertSqlString);
        let result = await db.select(connection, insertSqlString);
        console.log(result);
        return res.send({
            'state': 0
        });
    }else {
        return res.send({
            'state': 1
        });
    }
});

/* 查询表 */
router.get('/find', async function () {
    let sqlString = 'SELECT * FROM user';
    let connection = db.connection();
    let result = await db.select(connection, sqlString);
    console.log(result);
    //db.close(connection);
});

module.exports = router;
