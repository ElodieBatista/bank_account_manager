var db = require('../db/db');

module.exports = function (app) {
  /**
   *  GET
   *  Return all accounttypes
   */
  app.get('/accounttype', function (req, res) {
    db.accounttype.find({}, function(err, accounttypes) {
      if (err) res.send(500);

      res.send(200, {
        data: accounttypes
      });
    });
  });
};