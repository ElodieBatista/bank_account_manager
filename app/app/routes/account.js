var db = require('../db/db');

module.exports = function (app) {
  /**
   *	GET
   *  Return all accounts
   */
  app.get('/account', function (req, res) {
    db.account.find({}, function(err, accounts) {
      if (err) res.send(500);

      // TODO: for each account, find its transactions
      db.transaction.find({}, function(err, transactions) {
        if (err) res.send(500);

        var i, l = 0;
        accounts[0].transactions = new Array(12);
        for (i = 0, l = accounts[0].transactions.length; i < l; i++) {
          accounts[0].transactions[i] = [];
        }

        for (i = 0, l = transactions.length; i < l; i++) {
          accounts[0].transactions[transactions[i].month].push(transactions[i]);
        }

        res.send(200, {
          data: accounts
        });
      });
    });
  });

};