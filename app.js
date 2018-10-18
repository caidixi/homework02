let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let jwt = require('jsonwebtoken');
const secret = 'bingo';

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/*', function(req, res, next){
    let url=req.url;
    if (url.endsWith('.js')||url==='/user/login/'||url==='/user/register/'){
        next();
    } else if(url==='/'||url==='/stylesheets/login-style.css'||url==='/favicon.ico'){
        next();
    }else {
        let token =(req.cookies.token);
        if(token !== undefined){
            jwt.verify(token,secret,function (err,decoded) {
                if(err){
                    console.log(err);
                    res.redirect('/');
                }else {
                    next();
                }
            });
        }else {
            res.redirect('/');
        }
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;