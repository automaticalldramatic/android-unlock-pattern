/**
 * Main JS file for Android Unlock
 * 
 * @author Rizwan Iqbal <mailme@rizwaniqbal.com>
 */

(function(undefined) {
	"use strict"

	var androidUnlockPattern = function() {

		isDrawing:false;

		var config = {
			autostart: true,
			needFirstPoint: true,
			ctx: document.getElementById("line").getContext("2d"),
			container: '.pattern-unlock-container',
			buttonClass: '.lock-button',
			setPattern: '#setButton',
			unlockPattern: '#checkButton'
		};

		var ui = {
			/**
			 * Initialize the whole UI. Make things work!!
			 * Ideally we would paing the whole UI using this.
			 * Cause we need this in 4 hours, lets skip that and have UI setup
			 */
			init: function() {
				ui.bindings();
				if( config.autostart ) {
					var container = document.querySelector(config.container);;
					helpers.generate(container);
				}
			},

			/**
			 * Event bindings on the DOM. Call it before painting the div.
			 */
			bindings: function() {
				//Bind the Pagination click events
				var matches;

				(function(doc) {
					matches = 
					doc.matchesSelector ||
					doc.webkitMatchesSelector ||
					doc.mozMatchesSelector ||
					doc.oMatchesSelector ||
					doc.msMatchesSelector;
				})(document.documentElement);

				//This way we add just one listener in place of adding multiple listeners
				document.addEventListener('click', function(e) {
					if ( matches.call( e.target, config.setPattern) ) {
						console.log("Setting Pattern");
					}
					if ( matches.call( e.target, config.unlockPattern) ) {
						console.log("Unlocking Pattern");
					}
				}, false);

				document.addEventListener('mousedown', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						helpers.startDrawing(e);
					}
				}, false);

				document.addEventListener('mouseover', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						helpers.connectDots(e);
					}
				}, false);

				document.addEventListener('mouseup', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						console.log("Stop Selection" + e.target.id);
						e.target.classList.add('touched');
						androidUnlockPattern.isDrawing = false;
					}
				}, false);

				// This is for Touch Devices
				document.addEventListener('touchstart', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						console.log("Button Selected" + e.target.id);
						e.target.classList.add('touched');
					}
				}, false);

				document.addEventListener('touchmove', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						if(androidUnlockPattern.isDrawing) {
							console.log("Button Moved" + e.target.id);
							e.target.classList.add('touched');
						}
					}
				}, false);

				document.addEventListener('touchend', function(e) {
					if ( matches.call( e.target, config.buttonClass) ) {
						console.log("Stop Selection" + e.target.id);
						e.target.classList.add('touched');
						androidUnlockPattern.isDrawing = false;
					}
				}, false);
				return this;
			}
		};

		var helpers = {

			generate: function(el) {
				var buttonHolder = document.createElement("ul");
				for (var i = 1; i < 10; i++) {
					var listButton = document.createElement("li");
					listButton.className = "lock-button";
					listButton.id = "line" + i;
					buttonHolder.appendChild(listButton);
				};
				el.appendChild(buttonHolder);
			},

			startDrawing: function(el) {
				console.log("Button Selected" + el.target.id);
				androidUnlockPattern.isDrawing = true;
				el.target.classList.add('touched');
			},

			connectDots: function(el) {
				if(androidUnlockPattern.isDrawing) {
					console.log("Button Moved" + el.target.id);
					console.log(el.pageX);
					el.target.classList.add('touched');
					helpers.drawNextLine(config.ctx, el.pageX, el.pageY);
					// config.ctx.beginPath();
					// config.ctx.moveTo(el.pageX, el.pageY);
					// config.ctx.lineTo(el.pageX, el.pageY);
					// config.ctx.strokeStyle = "#47abb2";
					// config.ctx.stroke();
					// config.ctx.closePath();
				}
			},
			drawNextLine: function(ctx, x, y) {
				ctx.strokeStyle = "#47abb2";
				if (config.needFirstPoint) {
					ctx.lineWidth = 5;
					ctx.beginPath();
					ctx.moveTo(x, y);
					config.needFirstPoint = false;
				}
				else {
					ctx.lineTo(x, y);
					ctx.stroke();
				}
			}
		};
		
		return {
			'ui':ui
		};

	}();

	androidUnlockPattern.ui.init();

})();