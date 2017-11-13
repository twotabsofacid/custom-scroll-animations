# customScrollAnimations
> a module to quickly develop custom scroll animations

It's like a normal `.in-viewport` type scroll plugin, but better, because you can pass a file of custom js animations to it and it'll run those when appropriate.

You pass the classname you want the customScrollAnimations plugin to watch, and when those elements enter the viewport it adds the class `.in-viewport` to those elements.

What makes this better than the 100000 other packages that do that, is that you can pass a file of custom JS animations to trigger when an element enters the viewport, instead of having to rely on just CSS animations. 

## Installation
Install via npm:

```sh
$ npm i custom-scroll-animations --save
```

Here's a [link to the package](https://www.npmjs.com/package/custom-scroll-animations).

## Usage

You can run the custom scroll animations like so:

```javascript
var CustomScrollAnimations = require('custom-scroll-animations');
var testAnimations = require('./modules/test-animations');
var customScrollAnimations = new CustomScrollAnimations({
	className: '.scroll-trigger',
	customAnimations: testAnimations
});
```

where `modules/test-animations.js` looks like this:

```javascript
module.exports = {
	someAnimationName: function(elem) {
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
```

When an element that has the class `.scroll-trigger` enters the viewport it will get the class `.in-viewport`. If you have a custom animation defined for it, you can add that to the markup of the element in your HTML, like so:

```html
<h1 class="scroll-trigger" data-custom-animation="someAnimationName">Hello World!</h1>
```

Another thing you can add is an offset for when to trigger the scroll event. So, for example, you could do:

```html
<h1 class="scroll-trigger" data-custom-animation="someAnimationName" data-scroll-offset="-200">Hello World!</h1>
```

And that will wait until the item is `200px` within the viewport until it triggers the animation.

Alternatively, you don't have to use custom animations or anything like that. You can just do:

```javascript
var CustomScrollAnimations = require('custom-scroll-animations');
var customScrollAnimations = new CustomScrollAnimations({
	className: '.scroll-trigger'
});
```

and in your markup put:

```html
<h1 class="scroll-trigger">Hello World!</h1>
```

