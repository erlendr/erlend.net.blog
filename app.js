
/**
 * Module dependencies.
 */

var config = require('./config').init();
var express = require('express');
var exphbs  = require('express3-handlebars');
var helpers = require('./views/lib/helpers');
var routes = require('./routes');
var user = require('./routes/user');
var contact = require('./routes/contact');
var about = require('./routes/about');
var archives = require('./routes/archives');
var post = require('./routes/post');
var admin = require('./routes/admin');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

//Passport config
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username !== config.adminUsername || password !== config.adminPassword) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    return done(null, {id: 0, username: username});
  }
  ));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {id: id, username: config.adminUsername});
});

var app = express();

// all environments
app.engine('handlebars', 
  exphbs(
  {
    helpers: helpers,
    defaultLayout: 'main',
    partialsDir: [
    'views/partials'
    ]
  }
  ));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('0aa6038a-e92e-4441-84d1-04972126c9c1'));
app.use(session({
  resave: false,
  secret: '0aa6038a-e92e-4441-84d1-04972126c9c1',
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(methodOverride());

// development only
if (app.get('env') === 'development') {
  app.use(errorhandler());
}

app.get('/', routes.index);
app.get('/contact', contact.index);
app.get('/about', about.index);
app.get('/archives', archives.index);
app.get('/users', user.list);
app.get('/post/:id', post.index);
app.get('/post/:id/:slug', post.index);
app.get('/login', login.index);
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
  }),
  login.login
  );
app.get('/admin', admin.index);
app.get('/admin/add', admin.addPost);
app.post('/admin/add', admin.addPostData);
app.post('/admin/delete', admin.deletePost);
app.get('/admin/edit/:id', admin.editPost);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});