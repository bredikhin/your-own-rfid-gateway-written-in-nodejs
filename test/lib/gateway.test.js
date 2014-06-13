'use strict';

/**
 * Dependencies
 */
var should = require('should');
var EventEmitter = require('events').EventEmitter;
var Gateway = require('../../lib/gateway');
var gateway = new Gateway();

describe('Gateway', function() {
  it('is an EventEmitter', function(done) {
    gateway.should.be.an.instanceOf(EventEmitter);

    done();
  });

//  it('has a Data class', function(done) {
//    exosite.should.have.a.property('Data');
//
//    done();
//  });
});
