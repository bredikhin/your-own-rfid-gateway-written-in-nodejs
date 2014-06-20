    'use strict';

    /**
     * Dependencies
     */
    var config = require('./config.json');
    var Gateway = require('./lib/gateway');

    module.exports = new Gateway(config);