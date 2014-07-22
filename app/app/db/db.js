/**
 * Database configuration
 */
var Datastore = require('nedb');
var databaseUrl = 'accounts.db';

var db = {};
db.accounts = new Datastore({ filename: databaseUrl, autoload: true });

module.exports = db;