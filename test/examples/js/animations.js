'use strict';

module.exports = {
	browserTestAnimation: function(elem) {
		var h1Elem = elem.querySelector('h1');
		var h2Elem = elem.querySelector('h2');
		TweenLite.set(h1Elem, {
			opacity: 0,
			scale: 0,
			rotation: '27deg'
		});
		TweenLite.set(h2Elem, {
			opacity: 0,
			scale: 0,
			rotation: '1080deg'
		})
		TweenLite.to(h1Elem, 2, {
			ease: Elastic.easeOut.config(1, 0.2),
			opacity: 1,
			scale: 1,
			rotation: '0deg',
			onComplete: function() {
				TweenLite.to(h2Elem, 2, {
					ease: Power2.easeOut,
					opacity: 1,
					scale: 1,
					rotation: '0deg'
				})
			}
		});
	},
	tapeTestAnimation: function(elem) {
		return true;
	}
}