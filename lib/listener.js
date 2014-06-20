'use strict';

/**
 * Dependencies
 */
var Transform = require('stream').Transform;
var util = require('util');
var fork = require('child_process').fork;
var async = require('async');
var split2 = require('split2');

module.exports = Listener;

function Listener(config) {
  var that = this;

  Transform.call(this, {objectMode: true});

  async.each(config['devices'], function(deviceConfig, cb) {
    that.attach(deviceConfig, function(err) {  
      cb(err);
    });
  }, function(err) {
    if (err)
      return that.emit('error', err);

    that.emit('ready');
  });
}

util.inherits(Listener, Transform);

Listener.prototype._transform = function(message, enc, next) {

  // We can do some preprocessing here

  this.push(message, enc);

  next();
};

Listener.prototype.attach = function(config, done) {
  var that = this;

  var device = fork(config.module, [], {
    silent: true
  });

  device.send({
    event: 'connect',
    config: config
  });

  device.on('message', function(message) {
    switch (message.event) {
      case 'ready':
        done();
        break;
      case 'error':
        that.emit('error', message.error);
        break;
      default:
        break;
    }
  });

  device.stdout.pipe(split2(JSON.parse)).pipe(this);
};