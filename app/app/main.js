/**
 * Module dependencies
 */
var express = require('express'),
	path = require('path'),
	Datastore = require('nedb');

var app = express();
var application_root = process.execPath;

/**
 * Database configuration
 */
var databaseUrl = './db/accounts.db';
var db = {};
db.accounts = new Datastore({ filename: databaseUrl, autoload: true });


/*var doc = { name: 'world' };

db.accounts.insert(doc, function (err, newDoc) {   // Callback is optional
  console.log('Yeah');
});*/

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(application_root, 'public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


app.get('/api', function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.send('Ecomm API is running');
});

app.get('/accounts', function (req, res) {
	 res.header("Access-Control-Allow-Origin", "http://localhost");
	/*res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");*/
	db.accounts.find({}, function(err, accounts) {
	if ( err || !accounts) {
		res.send('No accounts found');
	} else {
		res.writeHead(200, {'Content-Type': 'application/json'});
		str='[';
		accounts.forEach( function(account) {
			str = str + '{ "name" : "' + account.name + '"},' +'\n';
		});
		str = str.trim();
		str = str.substring(0,str.length-1);
		str = str + ']';
		res.end( str);
	}
  });
});

app.listen(1212);