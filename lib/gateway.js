'use strict';

/**
 * Dependencies
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util')
var async = require('async');
var _ = require('lodash');
var Uploader = require('./uploader');
var Listener = require('./listener');
var defaults = require('./defaults.json');

module.exports = Gateway;

// Gateway module
function Gateway(config) {
  if (!(this instanceof Gateway))
    return new Gateway(config);

  EventEmitter.call(this);

  // Configuration validation, defaults, etc.
  config = config || {};
  _.defaults(config, defaults);

  // Instantiate a listener and an uploader
  var uploader = new Uploader(config['uploader']);
  var listener = new Listener(config['listener']);

  // Deployment-related events: online message
  async.each([listener, uploader], function(stream, cb) {
    stream.on('error', function(err) {
      console.error(err);
      process.send('shutdown');
    });

    stream.on('ready', function() {
      cb();
    });
  }, function(err) {
    if (err) {
      console.error(err);      
      process.send('shutdown');
    }

    process.send('online');
  });

  // Deployment-related events: shutdown message
  process.on('message', function(message) {
    if (message === 'shutdown') {
      async.each([listener, uploader], function(stream, cb) {
        stream.emit('shutdown');

        stream.on('close', function() {
          cb();
        });
      }, function(err) {        
        process.exit((err) ? 1 : 0);
      });
    }
  });

  // Let's get it started
  listener.pipe(uploader);
}

util.inherits(Gateway, EventEmitter);