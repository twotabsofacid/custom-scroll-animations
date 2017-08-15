'use strict';

module.exports = {
	testAnimation: function(elem) {
		console.log('we have a test animation', elem);
		elem.style.opacity = '0';
		elem.style.transform = 'translateY(800px) rotate(17deg)';
		setTimeout(function() {
			elem.style.transitionDuration = '1s';
			elem.style.opacity = '1';
			elem.style.transform = 'translateY(0) rotate(0deg)';
		}, 1000);
	}
}
