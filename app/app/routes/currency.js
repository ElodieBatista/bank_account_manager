var db = require('../db/db');

module.exports = function (app) {
    /**
     *  GET
     *  Return all currencies
     */
    app.get('/currency', function (req, res) {
        db.currency.find({}, function(err, currencies) {
            if (err) res.send(500);

            res.send(200, {
                data: currencies
            });
        });
    });
};