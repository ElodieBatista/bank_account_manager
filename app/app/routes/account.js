var db = require('../db/db');
var async = require('async');

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
                    db.year.insert({name: account.creation_year, count: 0}, function(err, year) {
                        if (err) res.send(500);

                        res.send(201, {
                            data: {
                                account: newAccount,
                                year: year
                            }
                        });
                    });
                } else {
                    db.year.update({$inc: {count: +1}}, function(err, year) {
                        if (err) res.send(500);

                        res.send(201, {
                            data: {
                                account: newAccount
                            }
                        });
                    });
                }
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

        db.account.find({_id: accountId}, function(err, accounts) {
            if (err) res.send(500);

            var accountBeforeUpdate = accounts[0];

            db.account.update({_id: accountId}, account, {}, function(err) {
                if (err) res.send(500);

                db.account.find({_id: accountId}, function(err, editedAccount) {
                    db.year.find({name: account.creation_year}, function(err, years) {
                        if (years.length === 0) {
                            db.year.insert({name: account.creation_year, count: 0}, function(err, year) {
                                if (err) res.send(500);
                            });
                        } else {
                            db.year.update({name: account.creation_year, $inc: {count: +1}}, function(err, year) {
                                if (err) res.send(500);
                            });
                        }
                    });

                    db.year.update({name: accountBeforeUpdate.creation_year, $inc: {count: -1}}, function(err, year) {
                        if (err) res.send(500);
                    });

                    db.transaction.remove({account_id: accountId, year: {$lt:account.creation_year}}, function(err) {
                        if (err) res.send(500);

                        res.send(200, {
                            data: editedAccount[0]
                        });
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

        /*db.account.find({_id: accountId}, function(err, accounts) {
            if (err) res.send(500);

            db.account.remove({_id: accountId}, function (err) {
                if (err) res.send(500);

                db.transaction.remove({account_id: accountId}, function (err) {
                    if (err) res.send(500);

                    db.year.update({name: accounts[0].creation_year}, {$inc: {count: -1}}, {}, function (err) {
                        if (err) res.send(500);

                        res.send(200);
                    });
                });
            });
        });*/


        async.parallel([
                function(callback) {
                    // Get account creation year
                    db.account.find({_id: accountId}, function(err, accounts) {
                        if (err) callback(err);
                        callback(null, accounts[0].creation_year);
                    });
                },
                function(callback) {
                    // Remove account
                    db.account.remove({_id: accountId}, function (err) {
                        if (err) callback(err);
                        callback(null);
                    });
                },
                function(callback) {
                    // Remove account's transactions
                    db.transaction.remove({account_id: accountId}, function (err) {
                        if (err) callback(err);
                        callback(null);
                    });
                }
            ],
            function(err, results) {
                if (err) {
                    res.send(500);
                } else {
                    db.year.findOne({name: results[0]}, function(err, year) {
                        if (year.count <= 1) {
                            // Remove account's transactions
                            db.year.remove({_id: year._id}, function (err) {
                                if (err) if (err) res.send(500);
                                res.send(200, {
                                    data: {
                                        yearToDelete: year._id
                                    }
                                });
                            });
                        } else {
                            // Update year's count
                            db.year.update({_id: year._id}, {$inc: {count: -1}}, {}, function (err) {
                                if (err) res.send(500);
                                res.send(200);
                            });
                        }
                    });
                }
            });
    });
};