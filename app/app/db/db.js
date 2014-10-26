/**
 * Database configuration
 */
var Datastore = require('nedb');

var db = {};
db.accounttype = new Datastore({ filename: './db/accounttype.db', autoload: true });
db.account = new Datastore({ filename: './db/account.db', autoload: true });
db.category = new Datastore({ filename: './db/category.db', autoload: true });
db.paymethod = new Datastore({ filename: './db/paymethod.db', autoload: true });
db.transaction = new Datastore({ filename: './db/transaction.db', autoload: true });
db.currency = new Datastore({ filename: './db/currency.db', autoload: true });
db.year = new Datastore({ filename: './db/year.db', autoload: true });

module.exports = db;