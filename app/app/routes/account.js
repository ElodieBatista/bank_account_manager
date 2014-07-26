var db = require('../db/db');

module.exports = function (app) {
	/**
     *	GET
     *  Return all accounts
     */
	app.get('/account', function (req, res) {
		db.account.find({}, function(err, accounts) {
			if (err) res.send(500);

      		res.end(JSON.stringify(accounts));
	  	});
	});

};