# F-IE (Fun...) with Internet Explorer

[DEMO HERE](https://j42.github.io/F-IE)

Let's be proactive about the quality of the browsers we develop for.  Better technologies and standards adherence not only makes our lives simpler, it raises the bar of new and exciting tools at our disposal.

It's never been easier to be proactive!  Just include the following script at the bottom of any HTML file to automatically load the splash when IE is detected.

**This is all you need to include in your page:**

```javascript
;(function() {
	var script = document.createElement('script');
	script.setAttribute('id','j42-upgradetoday');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src','//j42.github.io/F-IE/build/load.js');
	document.getElementsByTagName('head')[0].appendChild(script);
}());
```


## Coming Soon

- CDN integration
- Configurations & improved detection
- Fixes on older IE versions (though perhaps the errors lend credence to the argument)


## Compiling a Build

	gulp build

Creates assets in `./build/` directory, and concatenate/minify everything to `./index.html`

#### Build Dependencies

	sudo apt-get install node
	sudo npm install -g gulp
	npm install --save-dev gulp-file-insert gulp-concat gulp-uglify gulp-minify-css gulp-base64 gulp-minify-html gulp-replace utf8