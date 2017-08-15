'use strict';

var merge = require('lodash/merge');
var scrollTrack = require('scrollmonitor');

/**
 * Constructor description
 *
 * @class CustomScrollAnimations
 *
 * @classdesc a module to quickly develop custom scroll animations
 *
 * @param {options} object - Object instantiation options
 */
function CustomScrollAnimations(options) {
	// Create the options
	this.options = merge({}, CustomScrollAnimations.DEFAULTS, options || {});
	// References
	this.scrollTriggerElems = [];
	this.watchers = [];
    // All bindings
	this._onEnterViewport = this._onEnterViewport.bind(this);
	this.destroy = this.destroy.bind(this);
    // Setup
	this._setup();
}

CustomScrollAnimations.DEFAULTS = {
	className: '.scroll-trigger',
	customAnimations: {}
};

module.exports = CustomScrollAnimations;

/**
 * Setup method
 * @return {null}
 */
CustomScrollAnimations.prototype._setup = function () {
	var i;
	var scrollOffset;
	var customAnimation;
	this.scrollTriggerElems = [].slice.call(document.querySelectorAll(this.options.className));
	this.scrollTriggerElemsLen = this.scrollTriggerElems.length;
	i = this.scrollTriggerElemsLen;
	while (i--) {
		scrollOffset = parseInt(this.scrollTriggerElems[i].getAttribute('data-scroll-offset') || 0, 10);
		customAnimation = this.scrollTriggerElems[i].getAttribute('data-custom-animation');
		this.watchers[i] = scrollTrack.create(this.scrollTriggerElems[i], scrollOffset);
		this.watchers[i].customAnimation = customAnimation;
		this.watchers[i].customAnimationHasRun = false;
		this.watchers[i].enterViewport(this._onEnterViewport);
	}
};

/**
 * Triggered when an element enters the viewport
 * @private
 * @return {null}
 */
CustomScrollAnimations.prototype._onEnterViewport = function () {
	var i = this.scrollTriggerElemsLen;
	while (i--) {
		if (this.watchers[i] && (this.watchers[i].isInViewport || this.watchers[i].isFullyInViewport)) {
			if (this.watchers[i].customAnimation && !this.watchers[i].customAnimationHasRun) {
				this.watchers[i].customAnimationHasRun = true;
				this.options.customAnimations[this.watchers[i].customAnimation](this.watchers[i].watchItem);
			}
			this.scrollTriggerElems[i].classList.add('in-viewport');
		}
	}
};

/**
 * The Destroy method, to kill this stuff
 * @public
 * @return {null}
 */
CustomScrollAnimations.prototype.destroy = function () {
	let i = this.watchers.length;
	while (i--) {
		this.watchers[i].destroy();
	}
};
