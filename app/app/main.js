/**
 * Module dependencies
 */
var express = require('express'),
	path = require('path'),
	routes = require('./routes'),
	db = require('./db/db');

var app = express();
var application_root = process.execPath;



/**
 * Database configuration
 */
/*var databaseUrl = './db/accounts.db';
var db = {};
db.accounts = new Datastore({ filename: databaseUrl, autoload: true });*/


var doc = { name: 'world' };

db.accounts.insert(doc, function (err, newDoc) {   // Callback is optional
  console.log('Yeah');
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(application_root, 'public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


app.get('/api', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.send('Bank Account Manager API is running');
});


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
 * redirect all other routes to the index page
 */
app.get('*', routes.index);

app.listen(1212);