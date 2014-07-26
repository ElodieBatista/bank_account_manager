var db = require('../db/db');

module.exports = function (app) {
    require('../routes/accounttype')(app);
    require('../routes/account')(app);
    require('../routes/category')(app);
    require('../routes/paymethod')(app);
    require('../routes/transaction')(app);

    app.get('/fixtures', function(req, res) {
		var types = [
			{
				name: 'checking'
			},
			{
				name: 'saving'
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

      var account = {
      	name: 'Bank of America',
      	accounttype_id: 'jmiKlztAzPQlhSKq',
      	creation_day: 1,
      	creation_month: 1,
      	creation_year: 2014,
      	creation_amout: 100
      };

      var transaction = {
      	name: 'Super Duper Burger diner with Amy',
      	category_id: 'UiejS8YXUSLsbvS4',
      	account_id: 'i0xycE2TbpND6Dkp',
      	paymethod_id: '',
      	value: -39.99,
      	day: 3,
      	month: 7,
      	year: 2014
      };

		/*for (var i = 0, l = categories.length; i < l; i++) {
			db.category.insert(categories[i], function(err, newCategory) {
				
			});
		}

		for (var i = 0, l = types.length; i < l; i++) {
			db.accounttype.insert(types[i], function(err, newType) {
				
			});
		}*/

		/*for (var i = 0, l = paymentMethods.length; i < l; i++) {
			db.paymethod.insert(paymentMethods[i], function(err, newPaymethod) {
				
			});
		}*/

		/*db.account.insert(account, function(err, newAccount) {
			
		});*/

		/*db.transaction.insert(transaction, function(err, newTransaction) {
			
		});*/


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