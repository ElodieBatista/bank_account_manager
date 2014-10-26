var db = require('../db/db');

module.exports = function (app) {
    /**
     *  GET
     *  Return all years
     */
    app.get('/year', function (req, res) {
        db.year.find({}, function(err, years) {
            if (err) res.send(500);

            res.send(200, {
                data: years
            });
        });
    });
};