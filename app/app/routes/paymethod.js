var db = require('../db/db');

module.exports = function (app) {
  /**
   *  GET
   *  Return all payment methods
   */
  app.get('/paymethod', function (req, res) {
    db.paymethod.find({}, function(err, paymethods) {
      if (err) res.send(500);

      res.send(200, {
        data: paymethods
      });
    });
  });
};