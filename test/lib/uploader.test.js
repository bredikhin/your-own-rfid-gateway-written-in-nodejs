'use strict';

/**
 * Dependencies
 */
var should = require('should');
var Writable = require('stream').Writable;
var Uploader = require('../../lib/uploader');
var uploader = new Uploader();

describe('Uploader', function() {
  it('is a writable stream', function(done) {
    uploader.should.be.an.instanceOf(Writable);    

    done();
  });
});
