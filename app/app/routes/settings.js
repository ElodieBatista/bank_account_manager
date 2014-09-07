var db = require('../db/db');

module.exports = function (app) {
  /**
   *	GET
   *  Return the first month of the year
   */
  app.get('/settings/firstMonthOfYear', function (req, res) {
    db.settings.find({}, function(err, settings) {
      if (err) res.send(500);

      res.send(200, {
        data: settings.firstMonthOfYear
      });
    });
  });

  /**
   *  PUT
   *  Update the first month of the year
   */
  app.put('/settings/firstMonthOfYear', function (req, res) {
    var firstMonthOfYear = req.body.firstMonthOfYear;

    db.settings.update({ name: 'firstMonthOfYear'}, firstMonthOfYear, {}, function(err) {
      if (err) res.send(500);

      db.settings.find({ name: 'firstMonthOfYear'}, function(err, updatedSettings) {
        if (err) res.send(500);

        res.send(200, {
          data: updatedTransaction[0]
        });
      });
    });

    db.settings.find({}, function(err, settings) {
      if (err) res.send(500);

      res.send(200, {
        data: settings.firstMonthOfYear
      });
    });
  });

};