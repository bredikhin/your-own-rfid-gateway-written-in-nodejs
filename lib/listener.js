'use strict';

/**
 * Dependencies
 */
var Transform = require('stream').Transform;
var util = require('util');
var fork = require('child_process').fork;
var async = require('async');

module.exports = Listener;

function Listener(config) {
  var that = this;

  this._devices = [];
  
  Transform.call(this);

  this._readableState.objectMode = true;
  this._writableState.objectMode = false;

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

Listener.prototype._transform = function(chunk, enc, next) {

  // Doing some preprocessing here
  
  this.push(JSON.parse(chunk), enc);
  
  next();
};

Listener.prototype.attach = function(config, done) {
  var that = this;
  var Device;
  var device;
  
  device = fork(config.module, [], {
    silent: true
  });
  device.stdout._writableState.objectMode = true;
  device.stderr.objectMode = true;
  
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

  device.stdout.pipe(this);
  device.stderr.pipe(this);
};
