var db = require('../db/db');

module.exports = function (app) {
	app.post('/account', function(req, res) {
		//var account = req.body.account;
		var doc = { name: 'world' };

		db.accounts.insert(doc, function (err, newAccount) {
		  res.send(201);
		});
	});


	/**
     *	GET
     *  Return all accounts
     */
	app.get('/accounts', function (req, res) {
		res.header('Access-Control-Allow-Origin', 'http://localhost');

		db.accounts.find({}, function(err, accounts) {
			if (err) res.send(500);
			
			res.writeHead(200, {'Content-Type': 'application/json'});
			str = '[';
			accounts.forEach( function(account) {
				str = str + '{ "name" : "' + account.name + '"},' +'\n';
			});
			str = str.trim();
			str = str.substring(0,str.length-1);
			str = str + ']';
			res.end(str);
	  	});
	});

};