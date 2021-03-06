var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addressRouter = require('./routes/address');
var goodsRouter = require('./routes/goods');
var articleRouter = require('./routes/article');

var app = express();

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/login', function (req, res) {
    res.type('html');
    res.render('login', {title: "登录"});
})

app.get('/index', function (req, res) {
    res.type('html');
    res.render('index', {title: '首页'});
});

app.get('/user', function (req, res) {
    res.render('usersRouter', {title: '用户信息'});
});

app.get('/address', function (req, res) {
    res.render('addressRouter', {title: '地址管理'})
});

app.get('/goods', function (req, res) {
    res.render('goodsRouter', {title: '商品信息管理'})
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/address', addressRouter);
app.use('/goods', goodsRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
