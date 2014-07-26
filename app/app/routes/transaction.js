var db = require('../db/db');

module.exports = function (app) {
  /**
    *  GET
    *  Return all transactions
    */
  app.get('/transaction', function (req, res) {
    db.transaction.find({}, function(err, transactions) {
      if (err) res.send(500);

      res.end(JSON.stringify(transactions));
    });
  });
};