var db = require('../db/db');

module.exports = function (app) {
  /**
   *  GET
   *  Return all transactions
   */
  app.get('/transaction', function (req, res) {
    db.transaction.find({}, function(err, transactions) {
      if (err) res.send(500);

      res.send(200, {
        data: transactions
      });
    });
  });


  /**
   *  POST
   *  Create a new transaction
   */
  app.post('/transaction', function (req, res) {
    var transaction = req.body.transaction;

    db.transaction.insert(transaction, function(err, newTransaction) {
      if (err) res.send(500);

      res.send(201, {
        data: newTransaction
      });
    });
  });


  /**
   *  PUT
   *  Edit an existing transaction
   */
  app.put('/transaction', function (req, res) {
    var transaction = req.body.transaction;

    db.transaction.update({ _id: transaction._id}, transaction, {}, function(err) {
      if (err) res.send(500);

      db.transaction.find({ _id: transaction._id}, function(err, updatedTransaction) {
        if (err) res.send(500);

        res.send(200, {
          data: updatedTransaction[0]
        });
      });
    });
  });


    /**
     *  DELETE
     *  Delete a transaction
     */
    app.delete('/transaction/:id', function (req, res) {
        var transactionId = req.params.id;
        console.log(req.params.id);

        db.transaction.remove({_id: transactionId}, function(err) {
            if (err) res.send(500);

            res.send(200);
        });
    });
};