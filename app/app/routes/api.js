var db = require('../db/db');

module.exports = function (app) {
  require('../routes/accounttype')(app);
  require('../routes/currency')(app);
  require('../routes/account')(app);
  require('../routes/category')(app);
  require('../routes/paymethod')(app);
  require('../routes/transaction')(app);
  require('../routes/settings')(app);
  require('../routes/report')(app);

  app.get('/fixtures', function(req, res) {
    var types = [
      {
        name: 'checking'
      },
      {
        name: 'saving'
      }
    ];

    var currencies = [
      {
        name: 'euro',
        symbol: '€'
      },
      {
        name: 'dollar',
        symbol: '$'
      }
    ];

    var paymentMethods = [
      {
        name: 'Withdrawal'
      },
      {
        name: 'Check'
      },
      {
        name: 'Cash'
      },
      {
        name: 'Levy'
      },
      {
        name: 'Credit Card'
      }
    ];

    var categories = [
      {
        name: 'insurance',
        color: 'rgb(0, 112, 92)'
      },
      {
        name: 'gift',
        color: 'rgb(255, 192, 0)'
      },
      {
        name: 'divers',
        color: 'rgb(112, 48, 160)'
      },
      {
        name: 'school',
        color: 'rgb(255, 153, 255)'
      },
      {
        name: 'tax',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'technology',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'rent',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'health',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'food',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'salary',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'transportation',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'clothes',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'trip',
        color: 'rgb(228, 108, 10)'
      },
      {
        name: 'grant',
        color: 'rgb(228, 108, 10)'
      }
    ];

    var accounts = [
      {
        name: 'Bank of America',
        accounttype_id: 'jmiKlztAzPQlhSKq',
        currency_id: 'X3ZxksyOo95q5YP4',
        creation_day: 1,
        creation_month: 1,
        creation_year: 2014,
        creation_amount: 100
      },
      {
        name: 'BNP Paribas',
        accounttype_id: 'jmiKlztAzPQlhSKq',
        currency_id: 'rgkOzOzvh8APxtyF',
        creation_day: 5,
        creation_month: 3,
        creation_year: 2014,
        creation_amount: 500
      }
    ];

    var transactions = [
      {
        name: 'Transaction in the past',
        category_id: 'UiejS8YXUSLsbvS4',
        account_id: '4pyFYVcHk7rTWC4U',
        paymethod_id: '03ctyIK0mvwPZBX8',
        amount: -39.99,
        day: 1,
        month: 1,
        year: 2013,
        isDone: true
      },
      {
        name: 'BART',
        category_id: 'HGIUpGFzxe22Jzdb',
        account_id: '4pyFYVcHk7rTWC4U',
        paymethod_id: '03ctyIK0mvwPZBX8',
        amount: -90,
        day: 5,
        month: 1,
        year: 2014,
        isDone: false
      },
      {
        name: 'Mac Book Pro Retina',
        category_id: '2rebihhxmtl7RBgL',
        account_id: '4pyFYVcHk7rTWC4U',
        paymethod_id: '03ctyIK0mvwPZBX8',
        amount: -3000,
        day: 15,
        month: 5,
        year: 2014,
        isDone: false
      },
      {
        name: 'Safeway',
        category_id: 'UiejS8YXUSLsbvS4',
        account_id: '4pyFYVcHk7rTWC4U',
        paymethod_id: '03ctyIK0mvwPZBX8',
        amount: -80,
        day: 11,
        month: 7,
        year: 2014,
        isDone: false
      },
      {
        name: 'Gas',
        category_id: 'HGIUpGFzxe22Jzdb',
        account_id: '4pyFYVcHk7rTWC4U',
        paymethod_id: '03ctyIK0mvwPZBX8',
        amount: -50,
        day: 3,
        month: 6,
        year: 2014,
        isDone: false
      }
    ];

    /*for (var i = 0, l = categories.length; i < l; i++) {
     db.category.insert(categories[i], function(err, newCategory) {

     });
     }

     for (var i = 0, l = types.length; i < l; i++) {
     db.accounttype.insert(types[i], function(err, newType) {

     });
     }*/

      /*for (var i = 0, l = currencies.length; i < l; i++) {
          db.currency.insert(currencies[i], function(err, newCurrency) {

          });
      }*/

    /*for (var i = 0, l = paymentMethods.length; i < l; i++) {
     db.paymethod.insert(paymentMethods[i], function(err, newPaymethod) {

     });
     }*/

      /*for (var i = 0, l = accounts.length; i < l; i++) {
          db.account.insert(accounts[i], function(err, newAccount) {

          });
      }*/

    /*for (var i = 0, l = transactions.length; i < l; i++) {
      db.transaction.insert(transactions[i], function(err, newTransaction) {

      });
    }*/


    res.send(201);

    /*db.accounts.insert(type, function (err, newType) {
     db.accounts.insert(type2, function (err, newType2) {
     db.accounts.insert(account, function (err, newAccount) {
     res.send(201);
     });
     });
     });*/
  });
};