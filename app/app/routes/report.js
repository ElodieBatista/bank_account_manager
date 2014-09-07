var db = require('../db/db');

module.exports = function (app) {
    /**
     *	GET
     *  Return total spending by category
     */
    app.get('/report/spending/category', function (req, res) {
        db.category.find({}, function(err, categories) {
            if (err) res.send(500);

            for (var i = 0, l = categories.length; i < l; i++) {
              categories[i].y = 0;
            }

            db.transaction.find({}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = categories.length; j < le; j++) {
                        if (transactions[i].category_id === categories[j]._id && transactions[i].amount < 0) {
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
     *  Return total incoming by category
     */
    app.get('/report/incoming/category', function (req, res) {
        db.category.find({}, function(err, categories) {
            if (err) res.send(500);

            for (var i = 0, l = categories.length; i < l; i++) {
                categories[i].y = 0;
            }

            db.transaction.find({}, function(err, transactions) {
                for (var i = 0, l = transactions.length; i < l; i++) {
                    for (var j = 0, le = categories.length; j < le; j++) {
                        if (transactions[i].category_id === categories[j]._id && transactions[i].amount >= 0) {
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
     *  Return total transactions by category
     */
    app.get('/report/transactions/category', function (req, res) {
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

            db.transaction.find({}, function(err, transactions) {
                var index, transactionSens;

                for (var i = 0, l = transactions.length; i < l; i++) {
                  if (transactions[i].amount >= 0) {
                    transactionSens = 0;
                  } else {
                    transactionSens = 1;
                  }

                  index = findCategoryIndex(transactions[i].category_id);
                  result.series[transactionSens].data[index] += Math.abs(transactions[i].amount);
                  result.series[transactionSens].data[index] = parseFloat(result.series[transactionSens].data[index].toFixed(2));
                }

                res.send(200, {
                    data: result
                });
            });
        });
    });


    /**
     *	GET
     *  Return total transactions by month
     */
    app.get('/report/transactions/month', function (req, res) {
        function fillArrayWith0(n) {
            var newArray = new Array(n);
            for (var i = 0; i < n; i++) {
                newArray[i] = 0;
            }
            return newArray;
        }

        var result = {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                {
                    name: 'Incoming',
                    color: 'rgb(141, 237, 71)',
                    data: fillArrayWith0(result.categories.length)
                },
                {
                    name: 'Spending',
                    color: 'rgb(243, 69, 65)',
                    data: fillArrayWith0(result.categories.length)
                }
            ]
        };

        function findMonthIndex(monthId) {
            for (var i = 0, l = result.categories.length; i < l; i++) {
                if (result.categories[i] === monthId) {
                    return i;
                }
            }
        }

        db.transaction.find({}, function(err, transactions) {
            var index, transactionSens;

            for (var i = 0, l = transactions.length; i < l; i++) {
                if (transactions[i].amount >= 0) {
                    transactionSens = 0;
                } else {
                    transactionSens = 1;
                }

                index = findMonthIndex(transactions[i].category_id);
                result.series[transactionSens].data[index] += Math.abs(transactions[i].amount);
                result.series[transactionSens].data[index] = parseFloat(result.series[transactionSens].data[index].toFixed(2));
            }

            res.send(200, {
                data: result
            });
        });
    });
};