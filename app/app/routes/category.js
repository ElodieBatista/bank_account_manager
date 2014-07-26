var db = require('../db/db');

module.exports = function (app) {
  /**
    *  GET
    *  Return all categories
    */
  app.get('/category', function (req, res) {
    db.category.find({}, function(err, categories) {
      if (err) res.send(500);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(categories));
    });
  });
};