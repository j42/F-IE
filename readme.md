# F-IE (Fun with Internet Explorer)

Let's be proactive about the quality of the browsers we develop for.  Better technologies and standards adherence not only makes our lives simpler, it raises the bar of new and exciting tools at our disposal.

It's never been easier to be proactive!  Just include the following script at the bottom of any HTML file to help move us toward the future:

	;(function() {
		var script = document.createElement('script');
		script.setAttribute('id','j42-upgradetoday');
		script.setAttribute('type','text/javascript');
		script.setAttribute('src','//j42.github.io/F-IE/build/load.js');
		document.getElementsByTagName('head')[0].appendChild(script);
	}());


## Build Dependencies

	sudo apt-get install node
	sudo npm install -g gulp
	npm install --save-dev gulp-file-insert gulp-concat gulp-uglify gulp-minify-css gulp-base64 gulp-minify-html gulp-replace utf8