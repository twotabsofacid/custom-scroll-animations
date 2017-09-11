'use strict';

// Tape tests:
// https://github.com/substack/tape
const test = require('tape');
const CustomScrollAnimations = require('./../../');
const customScrollAnimations = new CustomScrollAnimations();
const customAnimations = require('./../examples/js/animations');

test('should be an object', assert => {
	assert.equal(typeof CustomScrollAnimations, 'function');
	assert.end();
});

test('_setup should be a function', assert => {
	assert.equal(typeof customScrollAnimations._setup, 'function');
	assert.end();
});

test('_onEnterViewport should be a function', assert => {
	assert.equal(typeof customScrollAnimations._onEnterViewport, 'function');
	assert.end();
});

test('destroy should be a function', assert => {
	assert.equal(typeof customScrollAnimations.destroy, 'function');
	assert.end();
});

test('should change default classes to new values when passed', assert => {
	const defaultClassScrollTrigger = new CustomScrollAnimations({
		triggerClass: '.scroll-class',
		activeClass: 'active'
	});
	assert.equal(defaultClassScrollTrigger.options.triggerClass, '.scroll-class');
	assert.equal(defaultClassScrollTrigger.options.activeClass, 'active');
	assert.end();
});

test('should add 3 elements to the page and watch them', assert => {
	var divArray = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
	var i = divArray.length;
	while (i--) {
		divArray[i].classList.add('scroll-trigger');
		document.body.appendChild(divArray[i]);
	}
	const newScrollTrigger = new CustomScrollAnimations();
	assert.equal(newScrollTrigger.scrollTriggerElemsLen, 3);
	document.body.innerHTML = '';
	assert.end();
});

test('should accept custom animations and add them to appropriate watchers', assert => {
	var divArray = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
	var i = divArray.length;
	while (i--) {
		divArray[i].classList.add('scroll-trigger');
		divArray[i].setAttribute('data-custom-animation', 'tapeTestAnimation');
		divArray[i].style.height = '100vh';
		document.body.appendChild(divArray[i]);
	}
	const newScrollTrigger = new CustomScrollAnimations({animations: customAnimations});
	assert.equal(typeof newScrollTrigger.options.animations[newScrollTrigger.watchers[1].customAnimation], 'function');
	document.body.innerHTML = '';
	assert.end();
});

test('should destroy all watchers', assert => {
	var divArray = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
	var i = divArray.length;
	while (i--) {
		divArray[i].classList.add('scroll-trigger');
		divArray[i].style.height = '100vh';
		document.body.appendChild(divArray[i]);
	}
	const newScrollTrigger = new CustomScrollAnimations();
	newScrollTrigger.destroy();
	assert.equal(newScrollTrigger.watchers[1], null);
	document.body.innerHTML = '';
	assert.end();
});

window.close();
