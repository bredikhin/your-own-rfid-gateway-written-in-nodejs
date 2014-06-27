'use strict';

/**
 * Dependencies
 */
var Writable = require('stream').Writable;
var util = require('util');

module.exports = Uploader;

function Uploader(config) {
  Writable.call(this, {objectMode: true});
}

util.inherits(Uploader, Writable);

Uploader.prototype._write = function(message, enc, next) {
  console.info('Sending: ' + JSON.stringify(message));

  // Sending to the cloud here

  next();
};