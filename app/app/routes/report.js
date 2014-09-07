var db = require('../db/db');

module.exports = function (app) {
    /**
     *	GET
     *  Return spending total by category
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
     *  Return incoming total by category
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
};