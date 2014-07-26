/**
 * Module dependencies
 */
var express = require('express'),
	path = require('path'),
	mw = require('./tools/middlewares'),
	routes = require('./routes'),
	db = require('./db/db');

var app = express();
var application_root = process.execPath;

app.set('port', process.env.PORT || 3000);

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(application_root, 'public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(mw.setHeaders);


/**
 * Routes
 */
app.get('/', routes.index);

app.options('*', function(req, res) {
	return res.send(200);
});


/**
 * JSON API
 */
require('./routes/api')(app);


/**
 * DEFAULT
 * Redirect all other routes to the index page
 */
app.get('*', routes.index);

app.listen(app.get('port'), function() {
  console.log('Bank Account Manager API listening on port ' + app.get('port'));
});