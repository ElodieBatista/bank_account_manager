var db = require('../db/db');

module.exports = function (app) {
    /**
     *  GET
     *  Return all accounts with transactions for a given year
     */
    app.get('/accounts/:year', function (req, res) {
        var year = parseInt(req.params.year);

        db.account.find({creation_year: {$lte:year}}, function(err, accounts) {
            if (err) res.send(500);

            db.transaction.find({year: year}, function(err, transactions) {
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
    app.get('/accounts', function (req, res) {
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
    app.post('/accounts', function (req, res) {
        var account = req.body.account;

        db.account.insert(account, function(err, newAccount) {
            if (err) res.send(500);

            db.year.find({name: account.creation_year}, function(err, years) {
                if (years.length === 0) {
                    db.year.insert({name: account.creation_year}, function(err, year) {
                        if (err) res.send(500);
                    });
                }
            });

            res.send(201, {
                data: newAccount
            });
        });
    });


    /**
     *  PUT
     *  Edit an account
     */
    app.put('/account/:id', function (req, res) {
        var accountId = req.params.id;
        var account = req.body.account;

        db.account.update({_id: accountId}, account, {}, function(err) {
            if (err) res.send(500);

            db.account.find({_id: accountId}, function(err, editedAccount) {
                db.year.find({name: account.creation_year}, function(err, years) {
                    if (years.length === 0) {
                        db.year.insert({name: account.creation_year}, function(err, year) {
                            if (err) res.send(500);
                        });
                    }
                });

                db.transaction.remove({account_id: accountId, year: {$lt:account.creation_year}}, function(err) {
                    if (err) res.send(500);

                    res.send(200, {
                        data: editedAccount
                    });
                });
            });
        });
    });


    /**
     *  DELETE
     *  Delete an account and its transactions
     */
    app.delete('/account/:id', function (req, res) {
        var accountId = req.params.id;

        db.account.remove({_id: accountId}, function(err) {
            if (err) res.send(500);

            db.transaction.remove({account_id: accountId}, function(err) {
                if (err) res.send(500);

                res.send(200);
            });
        });
    });
};