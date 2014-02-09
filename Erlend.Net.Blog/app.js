
/**
 * Module dependencies.
 */

var express = require('express');
var exphbs  = require('express3-handlebars');
var routes = require('./routes');
var user = require('./routes/user');
var contact = require('./routes/contact');
var about = require('./routes/about');
var archives = require('./routes/archives');
var post = require('./routes/post');
var http = require('http');
var path = require('path');

//Azure stuff
var azure = require('azure');
var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableService = azure.createTableService().withFilter(retryOperations);

var app = express();

// all environments
app.engine('handlebars', 
	exphbs(
		{
			defaultLayout: 'main',
			partialsDir: [
				'views/partials'
			]
		}
));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('0aa6038a-e92e-4441-84d1-04972126c9c1'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/contact', contact.index);
app.get('/about', about.index);
app.get('/archives', archives.index);
app.get('/users', user.list);
app.get('/post/:id', post.index);
app.get('/post/:id/:slug', post.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


tableService.createTableIfNotExists('posts', function(error){
	if(!error){
		console.log('table created!');
	}
});

var post = {
	PartitionKey : 'posts',
	RowKey : '2',
	Title : 'Azure still rocks',
	Slug: 'Sluggy slug',
	Content: '<p>Hi.</p>',
	CreatedDate: new Date()
};

/*tableService.insertEntity('posts', post, function(error){
	if(!error){
		console.log('entity inserted');
	}
});*/