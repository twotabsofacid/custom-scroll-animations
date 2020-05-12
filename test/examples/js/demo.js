
'use strict';

/**
 * Import all modules
 */
var CustomScrollAnimations = require('./../../../');
var customAnimations = require('./animations');

/**
 * Instantiate the CustomScrollAnimations,
 * with custom animations passed in
 */
var customScrollAnimations = new CustomScrollAnimations({
	triggerClass: '.trigger-animation-class-name',
	animations: customAnimations
});

document.getElementById("destroy").addEventListener('click', function(e) {
	e.preventDefault();
	customScrollAnimations.destroy();
});
