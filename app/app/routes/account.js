var db = require('../db/db');

module.exports = function (app) {
    /**
     *  GET
     *  Return all accounts with transactions for a given year
     */
    app.get('/accounts/:year', function (req, res) {
        var year = req.params.year;

        db.account.find({}, function(err, accounts) {
            if (err) res.send(500);

            db.transaction.find({year: year}, function(err, transactions) {
                console.log(transactions);
                if (err) res.send(500);

                var i, j, l = 0;

                for (i = 0, l = accounts.length; i < l; i++) {
                    // Instantiate arrays
                    accounts[i].transactions = new Array(12);
                    for (j = 1; j <= 12; j++) {
                        accounts[i].transactions[j] = [];
                    }
                }

                for (i = 0, l = transactions.length; i < l; i++) {
                    for (j = 0, le = accounts.length; j < le; j++) {
                        if (accounts[j]._id === transactions[i].account_id) {
                            accounts[j].transactions[transactions[i].month].push(transactions[i]);
                            break;
                        }
                    }
                }

                res.send(200, {
                    data: accounts
                });
            });
        });
    });


    /**
     *  GET
     *  Return all accounts
     */
    app.get('/account', function (req, res) {
        db.account.find({}, function(err, accounts) {
            if (err) res.send(500);

            db.transaction.find({}, function(err, transactions) {
                if (err) res.send(500);

                var i, j, l = 0;

                for (i = 0, l = accounts.length; i < l; i++) {
                    // Instantiate arrays
                    accounts[i].transactions = new Array(12);
                    for (j = 1; j <= 12; j++) {
                        accounts[i].transactions[j] = [];
                    }
                }

                for (i = 0, l = transactions.length; i < l; i++) {
                    for (j = 0, le = accounts.length; j < le; j++) {
                        if (accounts[j]._id === transactions[i].account_id) {
                            accounts[j].transactions[transactions[i].month].push(transactions[i]);
                            break;
                        }
                    }
                }

                res.send(200, {
                    data: accounts
                });
            });
        });
    });


    /**
     *  POST
     *  Create a new account
     */
    app.post('/account', function (req, res) {
        var account = req.body.account;

        db.account.insert(account, function(err, newAccount) {
            if (err) res.send(500);

            res.send(201, {
                data: newAccount
            });
        });
    });

};