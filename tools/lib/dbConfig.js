let sqlite3 = require('sqlite3').verbose();
let dbConfig = new sqlite3.Database('data/npm-admin');

module.exports = dbConfig;