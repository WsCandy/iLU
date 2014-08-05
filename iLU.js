;(function() {

	'use strict';

	var version = 'Alpha',
		pluginName = 'iLU';

	$.fn.iLU = function(options, param) {

		var results = [];

		for(var i = 0; i < this.length; i++) {

			var self = $(this[i]);

			if(!self.data('instance') && typeof options != 'string') {

				var instance = new core(self, options);
				self.data('instance', instance);
				instance.private_methods.initialise();

			} else {

				var instance = self.data('instance');

				if(!instance) {

					console.error('['+pluginName+' v'+version+'] - You\'re trying to fire a method on an element with no instance!');
					return false;

				} else if(instance.public_methods[options]) {

					if (this.length > 1) {

						results.push(instance.public_methods[options](param));

					} else {

						return instance.public_methods[options](param);
						
					}				

				} else {

					instance.private_methods.error(options + ' is not a defined method! Here\'s a list of methods! https://github.com/WsCandy/zRS#methods');

				}

			}

		}

		return results;

	}

	function core(self, options, param) {

		var instance = this;

		instance.defaults = {

			type: 'img',
			effect: 'scale'
			
		}

		var settings = $.extend(instance.defaults, options);

		var iLUpop;

		instance.private_methods = {

			initialise: function() {

				instance.public_methods.bind();
				instance.private_methods.createOverlay();
				instance.private_methods.createPopup();
				instance.private_methods.setup();

			},

			createOverlay: function() {

				if($('.iLU__overlay').size() <= 0) {

					$('<div />', {

						class : 'iLU__overlay'

					}).prependTo('body');

				}

			},

			createPopup: function() {

				if($('.iLU__popup').size() <= 0) {

					$('<div />', {

						class : 'iLU__popup'

					}).prependTo('body');

				}

				iLUpop = $('.iLU__popup');

			},

			typeHandler: function() {

				switch(settings.type) {

					case 'img' : 

						iLUpop.append('<img src="'+self.data('ilu')+'">');

					break;

				}

			},

			setup : function() {

				iLUpop.addClass('iLU__popup--'+settings.effect);

			},

			revoke : function() {

				iLUpop.removeClass('iLU__popup--'+settings.effect);				

			}

		}

		instance.public_methods = {

			bind: function() {

				self.unbind('click').click(function() {

					instance.public_methods.open['handler']();

				});

			},

			open: {

				handler: function() {

					instance.public_methods.toggleOverlay();
					instance.private_methods.typeHandler();

					iLUpop.css({

						'top' : $(document).scrollTop() + 100 + 'px'

					});

					instance.private_methods.revoke();

				}

			},

			close: {

				handler: function() {

					instance.public_methods.close[settings.effect]();					

				}

			},

			toggleOverlay: function() {

				var overlay = $('.iLU__overlay');

				if(overlay.hasClass('active')) {

					$('.iLU__overlay').removeClass('active');
					
				} else {

					$('.iLU__overlay').addClass('active');

				}

			}
			
		}

	}
	
})();