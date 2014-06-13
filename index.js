var config = require('./config');
var Gateway = require('./lib/gateway');

module.exports = new Gateway(config);