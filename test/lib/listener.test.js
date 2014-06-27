'use strict';

/**
 * Dependencies
 */
var should = require('should');
var Transform = require('stream').Transform;
var Listener = require('../../lib/listener');
var listener = new Listener();

describe('Listener', function() {
  it('is an transform stream', function(done) {
    listener.should.be.an.instanceOf(Transform);    

    done();
  });
});
