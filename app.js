var createError = require('http-errors'),
	express = require('express'),
	app = express(),
	path = require('path'),
	session = require('express-session'),
	morgan = require('morgan'),
  cons = require('consolidate'),
  bodyParser = require('body-parser'),
  indexRouter = require('./routes/index'),
  cookieParser = require('cookie-parser'),
  firebase = require('./bin/firebase_setup')


app.use(morgan('dev'));
app.use(cookieParser());

var sessionChecker = (req, res, next) => {
    if (firebase.auth().currentUser) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

app.get('/', (req, res) => {
    res.redirect('/login');
});


app.get('/logout', (req, res) => {
   firebase.auth().signOut()
 .catch(function (err) {
   // Handle errors
 });
        res.redirect('/');

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

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

module.exports = app;
