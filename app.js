var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet=require('helmet');
var cors = require('cors');
var session=require('express-session');

//auth with passport
const passport=require('passport');
var GitHubStrategy = require('passport-github').Strategy;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors())
//app.use(helmet()); only use when api calls and use in route files

//following middleware will use when external resource will use in our app
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//config passport for auth
app.use(session({
   secret: 'Express is my fav', 
   resave: false, 
   saveUninitialized: true,
   cookie:{secure:true} 
  }));

app.use(passport.initialize());
app.use(passport.session());

const passportConfig=require('./config');
passport.use(new GitHubStrategy(passportConfig,
function(accessToken, refreshToken, profile, cb) {
    //console.log(profile._json);
    //return cb(null, profile._json);
    return cb(null, profile);
  }
));

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});

//end passport config

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
