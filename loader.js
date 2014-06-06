;(function(window, undefined) {

	'use strict';

	var iframe = '{{COMPILED}}',

		onload = function contentLoaded(win, fn) {

			var done = false, top = true,

			doc = win.document, root = doc.documentElement,

			add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
			rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
			pre = doc.addEventListener ? '' : 'on',

			init = function(e) {
				if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
				(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
				if (!done && (done = true)) fn.call(win, e.type || e);
			},

			poll = function() {
				try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
				init('poll');
			};

			if (doc.readyState == 'complete') fn.call(win, 'lazy');
			else {
				if (doc.createEventObject && root.doScroll) {
					try { top = !win.frameElement; } catch(e) { }
					if (top) poll();
				}
				doc[add](pre + 'DOMContentLoaded', init, false);
				doc[add](pre + 'readystatechange', init, false);
				win[add](pre + 'load', init, false);
			}

		},

		inject = function(html) {
			var frame = document.createElement('iframe');
				frame.style.position = 'absolute';
				frame.style.zIndex = '999999';
				frame.style.width = '100%';
				frame.style.height = '100%';
			window.document.body.appendChild(frame);
			frame.contentWindow.document.open();
			frame.contentWindow.document.write(html);
			frame.contentWindow.document.close();
		};
	

	/* Init */

	onload(window, function() {
		inject(iframe);
	});

})(window, undefined);