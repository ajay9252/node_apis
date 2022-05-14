const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const env = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const http = require('http');

// importing routes module
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var merchantsRouter = require('./routes/merchants');
var merchantRegistrationRouter = require('./routes/merchant_registration');


var app = express();
var httpServer = http.createServer(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/merchant', merchantsRouter);
app.use('/merchantregister', merchantRegistrationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

httpServer.listen(process.env.server_port, () => {
    global.image_path = 'http://127.0.0.1:' + process.env.server_port + '/data/uploads/';
    console.log('server has start on port ' + process.env.server_port);
});

module.exports = app