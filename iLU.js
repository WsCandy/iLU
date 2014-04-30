;(function() {

	var version = '0.1',
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

					console.log('['+pluginName+' v'+version+'] - You\'re trying to fire a method on an element with no instance!');
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


			
		}

		var settings = $.extend(instance.defaults, options);

		instance.private_methods = {

			initialise: function() {

				alert('Plugin Fired! POW!');

			}

		}

		instance.public_methods = {


			
		}

	}
	
})();