'use strict';

// Tape tests:
// https://github.com/substack/tape
const test = require('tape');
const CustomScrollAnimations = require('./../../');

test('should be an object', assert => {
	assert.equal(typeof CustomScrollAnimations, 'function');
	assert.end();
});

window.close();
