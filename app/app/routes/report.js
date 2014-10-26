var db = require('../db/db');

module.exports = function (app) {
    /**
     *	GET
     *  Return total spending by category (and optionally by month)
     */
    app.get('/report/spending/category/:year/:month?', function (req, res) {
        var year = req.params.year;
        var month = req.params.month;

        db.category.find({}, function(err, categories) {
            if (err) res.send(500);

            for (var i = 0, l = categories.length; i < l; i++) {
                categories[i].y = 0;
            }

            db.transaction.find({year: year}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = categories.length; j < le; j++) {
                        if (transactions[i].category_id === categories[j]._id && transactions[i].amount < 0 && (!month || month == transactions[i].month)) {
                            categories[j].y += Math.abs(transactions[i].amount);
                            categories[j].y = parseFloat(categories[j].y.toFixed(2));
                            break;
                        }
                    }
                }

                res.send(200, {
                    data: categories
                });
            });
        });
    });


    /**
     *	GET
     *  Return total incoming by category (and optionally by month)
     */
    app.get('/report/incoming/category/:year/:month?', function (req, res) {
        var year = req.params.year;
        var month = req.params.month;

        db.category.find({}, function(err, categories) {
            if (err) res.send(500);

            for (var i = 0, l = categories.length; i < l; i++) {
                categories[i].y = 0;
            }

            db.transaction.find({year: year}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = categories.length; j < le; j++) {
                        if (transactions[i].category_id === categories[j]._id && transactions[i].amount >= 0 && (!month || month == transactions[i].month)) {
                            categories[j].y += Math.abs(transactions[i].amount);
                            categories[j].y = parseFloat(categories[j].y.toFixed(2));
                            break;
                        }
                    }
                }

                res.send(200, {
                    data: categories
                });
            });
        });
    });


    /**
     *	GET
     *  Return total spending by category and by month
     */
    app.get('/report/spending/:year/month/category', function (req, res) {
        var year = req.params.year;

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        db.category.find({}, function(err, categories) {
            var result = {
                categories: [],
                series: []
            };

            result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            for (var i = 0, l = categories.length; i < l; i++) {
                result.series.push({
                    id: categories[i]._id,
                    name: categories[i].name,
                    color: categories[i].color,
                    data: fillArrayWith0(result.categories.length + 1)
                });
            }

            result.series.push({
                name: 'Total',
                color: 'black',
                data: fillArrayWith0(result.categories.length + 1)
            });

            db.transaction.find({year: year}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = result.series.length - 1; j < le; j++) {
                        if (transactions[i].category_id === result.series[j].id && transactions[i].amount < 0) {
                            result.series[j].data[transactions[i].month - 1] += Math.abs(transactions[i].amount);
                            result.series[j].data[transactions[i].month - 1] = parseFloat(result.series[j].data[transactions[i].month - 1].toFixed(2));
                            result.series[j].data[result.series[j].data.length - 1] += Math.abs(transactions[i].amount);
                            result.series[j].data[result.series[j].data.length - 1] = parseFloat(result.series[j].data[result.series[j].data.length - 1].toFixed(2));
                            break;
                        }
                    }

                    if (transactions[i].amount < 0) {
                        result.series[result.series.length - 1].data[transactions[i].month - 1] += Math.abs(transactions[i].amount);
                        result.series[result.series.length - 1].data[transactions[i].month - 1] = parseFloat(result.series[result.series.length - 1].data[transactions[i].month - 1]);

                        result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1] += Math.abs(transactions[i].amount);
                        result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1] = parseFloat(result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1]);
                    }
                }

                res.send(200, {
                    data: result
                });
            });
        });
    });


    /**
     *	GET
     *  Return total incoming by category and by month
     */
    app.get('/report/incoming/:year/month/category', function (req, res) {
        var year = req.params.year;

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        db.category.find({}, function(err, categories) {
            var result = {
                categories: [],
                series: []
            };

            result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            for (var i = 0, l = categories.length; i < l; i++) {
                result.series.push({
                    id: categories[i]._id,
                    name: categories[i].name,
                    color: categories[i].color,
                    data: fillArrayWith0(result.categories.length + 1)
                });
            }

            result.series.push({
                name: 'Total',
                color: 'black',
                data: fillArrayWith0(result.categories.length + 1)
            });

            db.transaction.find({year: year}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = result.series.length - 1; j < le; j++) {
                        if (transactions[i].category_id === result.series[j].id && transactions[i].amount >= 0) {
                            result.series[j].data[transactions[i].month - 1] += Math.abs(transactions[i].amount);
                            result.series[j].data[transactions[i].month - 1] = parseFloat(result.series[j].data[transactions[i].month - 1].toFixed(2));
                            result.series[j].data[result.series[j].data.length - 1] += Math.abs(transactions[i].amount);
                            result.series[j].data[result.series[j].data.length - 1] = parseFloat(result.series[j].data[result.series[j].data.length - 1].toFixed(2));
                            break;
                        }
                    }

                    if (transactions[i].amount >= 0) {
                        result.series[result.series.length - 1].data[transactions[i].month - 1] += Math.abs(transactions[i].amount);
                        result.series[result.series.length - 1].data[transactions[i].month - 1] = parseFloat(result.series[result.series.length - 1].data[transactions[i].month - 1]);

                        result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1] += Math.abs(transactions[i].amount);
                        result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1] = parseFloat(result.series[result.series.length - 1].data[result.series[result.series.length - 1].data.length - 1]);
                    }
                }

                res.send(200, {
                    data: result
                });
            });
        });
    });


    /**
     *	GET
     *  Return total transactions by category
     */
    app.get('/report/transactions/category/:year/:month?', function (req, res) {
        var year = req.params.year;
        var month = req.params.month;

        var result = {
            categories: [],
            series: []
        };

        db.category.find({}, function(err, categories) {
            if (err) res.send(500);

            for (var i = 0, l = categories.length; i < l; i++) {
                result.categories.push(categories[i].name);
            }

            function fillArrayWith0(n) {
                var newArray = new Array(n);
                for (var i = 0; i < n; i++) {
                    newArray[i] = 0;
                }
                return newArray;
            }

            result.series = [
                {
                    name: 'Incoming',
                    color: 'rgb(141, 237, 71)',
                    data: fillArrayWith0(categories.length)
                },
                {
                    name: 'Spending',
                    color: 'rgb(243, 69, 65)',
                    data: fillArrayWith0(categories.length)
                }
            ];

            function findCategoryIndex(categoryId) {
                for (var i = 0, l = categories.length; i < l; i++) {
                    if (categories[i]._id === categoryId) {
                        return i;
                    }
                }
            }

            db.transaction.find({year: year}, function(err, transactions) {
                var index, transactionSens;

                for (var i = 0, l = transactions.length; i < l; i++) {
                    if (!month || month && transactions[i].month == month) {
                        if (transactions[i].amount >= 0) {
                            transactionSens = 0;
                        } else {
                            transactionSens = 1;
                        }

                        index = findCategoryIndex(transactions[i].category_id);
                        result.series[transactionSens].data[index] += Math.abs(transactions[i].amount);
                        result.series[transactionSens].data[index] = parseFloat(result.series[transactionSens].data[index].toFixed(2));
                    }
                }

                res.send(200, {
                    data: result
                });
            });
        });
    });


    /**
     *	GET
     *  Return total transactions by evolution
     */
    app.get('/report/transactions/evolution/:year', function (req, res) {
        var year = req.params.year;

        var result = {
            categories: [],
            series: []
        };

        result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        result.series = [
            {
                name: 'Incoming',
                color: 'rgb(141, 237, 71)',
                data: fillArrayWith0(result.categories.length)
            },
            {
                name: 'Spending',
                color: 'rgb(243, 69, 65)',
                data: fillArrayWith0(result.categories.length)
            },
            {
                name: 'Difference',
                color: 'rgb(52, 152, 219)',
                data: fillArrayWith0(result.categories.length)
            }
        ];

        db.transaction.find({year: year}, function(err, transactions) {
            var index, transactionSens;

            for (var i = 0, l = transactions.length; i < l; i++) {
                if (transactions[i].amount >= 0) {
                    transactionSens = 0;
                } else {
                    transactionSens = 1;
                }

                index = transactions[i].month - 1;
                result.series[transactionSens].data[index] += Math.abs(transactions[i].amount);
                result.series[transactionSens].data[index] = parseFloat(result.series[transactionSens].data[index].toFixed(2));
                result.series[2].data[index] = result.series[0].data[index] - result.series[1].data[index]
            }

            res.send(200, {
                data: result
            });
        });
    });


    /**
     *	GET
     *  Return total accounts by month
     */
    app.get('/report/accounts/:year/month', function (req, res) {
        var year = req.params.year;

        var result = {
            categories: [],
            series: []
        };

        result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        db.accounttype.find({}, function(err, accounttypes) {
            var types = {};
            for (var i = 0, l = accounttypes.length; i < l; i++) {
                if (!types[accounttypes[i]._id]) {
                    types[accounttypes[i]._id] = {};
                }
                types[accounttypes[i]._id].name = accounttypes[i].name;
            }

            db.account.find({}, function(err, accounts) {
                for (var i = 0, l = accounts.length; i < l; i++) {
                    result.series.push({
                        id: accounts[i]._id,
                        name: accounts[i].name,
                        color: types[accounts[i].accounttype_id].name === 'checking' ? 'rgb(52, 152, 219)' : 'rgb(243, 156, 18)',
                        data: fillArrayWith0(result.categories.length)
                    });
                }

                db.transaction.find({year: year}, function(err, transactions) {
                    for (var i = 0, l = transactions.length; i < l; i++) {
                        for (var j = 0, le = result.series.length; j < le; j++) {
                            if (result.series[j].id === transactions[i].account_id) {
                                result.series[j].data[transactions[i].month - 1] += transactions[i].amount;
                                break;
                            }
                        }
                    }

                    res.send(200, {
                        data: result
                    });
                });
            });
        });
    });


    /**
     *	GET
     *  Return total by month
     */
    app.get('/report/total/:year/month', function (req, res) {
        var year = req.params.year;

        var result = {
            categories: [],
            series: []
        };

        result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        result.series = [
            {
                name: 'Total',
                color: 'rgb(243, 69, 65)',
                data: fillArrayWith0(result.categories.length)
            }
        ];

        db.transaction.find({year: year}, function(err, transactions) {
            for (var i = 0, l = transactions.length; i < l; i++) {
                result.series[0].data[transactions[i].month - 1] += transactions[i].amount;
            }

            for (var j = 1, le = result.series[0].data.length; j < le; j++) {
                result.series[0].data[j] += result.series[0].data[j - 1];
            }

            res.send(200, {
                data: result
            });
        });
    });


    /**
     *	GET
     *  Return total accounts by account types
     */
    app.get('/report/total/accounttype/:year', function (req, res) {
        var year = req.params.year;

        var result = {
            categories: [],
            series: []
        };

        result.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        db.account.find({}, function(err, accounts) {
            var allaccounts = {};
            for (var i = 0, l = accounts.length; i < l; i++) {
                if (!allaccounts[accounts[i]._id]) {
                    allaccounts[accounts[i]._id] = {};
                }
                allaccounts[accounts[i]._id].accounttype_id = accounts[i].accounttype_id;
            }

            db.accounttype.find({}, function(err, accounttypes) {
                for (i = 0, l = accounttypes.length; i < l; i++) {
                    result.series.push({
                        id: accounttypes[i]._id,
                        name: accounttypes[i].name,
                        color: accounttypes[i].name === 'checking' ? 'rgb(52, 152, 219)' : 'rgb(243, 156, 18)',
                        data: fillArrayWith0(result.categories.length)
                    });
                }

                db.transaction.find({year: year}, function(err, transactions) {
                    for (var i = 0, l = transactions.length; i < l; i++) {
                        for (var j = 0, le = result.series.length; j < le; j++) {
                            if (result.series[j].id === allaccounts[transactions[i].account_id].accounttype_id) {
                                result.series[j].data[transactions[i].month - 1] += transactions[i].amount;
                            }
                        }
                    }

                    for (i = 0, l = result.series.length; i < l; i++) {
                        for (j = 1, le = result.series[i].data.length; j < le; j++) {
                            result.series[i].data[j] += result.series[i].data[j - 1];
                        }
                    }

                    res.send(200, {
                        data: result
                    });
                });
            });
        });
    });
};