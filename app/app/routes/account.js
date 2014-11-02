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
                console.log(transactions);

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

        async.parallel([
                function(callback) {
                    // Insert new account
                    db.account.insert(account, function(err, newAccount) {
                        if (err) callback(err);
                        callback(null, newAccount);
                    });
                },
                function(callback) {
                    // Find creation year
                    db.year.findOne({name: account.creation_year}, function(err, year) {
                        if (err) callback(err);
                        callback(null, year);
                    });
                }
            ],
            function(err, results) {
                if (err) {
                    res.send(500);
                } else {
                    if (!results[1]) {
                        // Add year if it doesn't exist
                        db.year.insert({name: account.creation_year, count: 1}, function(err, year) {
                            if (err) res.send(500);

                            res.send(201, {
                                data: {
                                    account: results[0],
                                    year: year
                                }
                            });
                        });
                    } else {
                        // Update year's count
                        db.year.update({$inc: {count: +1}}, function(err, year) {
                            if (err) res.send(500);

                            res.send(201, {
                                data: {
                                    account: results[0]
                                }
                            });
                        });
                    }
                }
            }
        );
    });


    /**
     *  PUT
     *  Edit an account
     */
    app.put('/account/:id', function (req, res) {
        var accountId = req.params.id;
        var account = req.body.account;

        /*db.account.find({_id: accountId}, function(err, accounts) {
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
        });*/

        async.parallel([
                function(callback) {
                    // Get account before update
                    db.account.findOne({_id: accountId}, function(err, account) {
                        if (err) callback(err);
                        callback(null, account);
                    });
                },
                function(callback) {
                    // Update account
                    db.account.update({_id: accountId}, account, {}, function(err) {
                        if (err) callback(err);
                        callback(null);
                    });
                },
                function(callback) {
                    // Remove past transactions
                    db.transaction.remove({account_id: accountId, year: {$lt:account.creation_year}}, function(err) {
                        if (err) callback(err);
                        callback(null);
                    });
                },
                function(callback) {
                    // Get account's creation year
                    db.year.findOne({name: account.creation_year}, function(err, year) {
                        if (err) callback(err);

                        if (!year) {
                            // Insert year
                            db.year.insert({name: account.creation_year, count: 1}, function(err, year) {
                                if (err) callback(err);
                                callback(null);
                            });
                        } else {
                            // Update year's count
                            db.year.update({name: account.creation_year}, {$inc: {count: +1}}, {}, function(err, year) {
                                if (err) callback(err);
                                callback(null);
                            });
                        }
                    });
                }
            ],
            function(err, results) {
                if (err) {
                    res.send(500);
                } else {
                    // Update year of account before being updated
                    db.year.update({name: results[0].creation_year}, {$inc: {count: -1}}, {}, function(err, year) {
                        if (err) res.send(500);

                        // Get and return updated account
                        db.account.findOne({_id: accountId}, function (err, editedAccount) {
                            res.send(200, {
                                data: editedAccount
                            });
                        });
                    });
                }
            }
        );
    });


    /**
     *  DELETE
     *  Delete an account and its transactions
     */
    app.delete('/account/:id', function (req, res) {
        var accountId = req.params.id;

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
            }
        );
    });
};