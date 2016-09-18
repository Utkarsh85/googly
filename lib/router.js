var Rlite = require('rlite-router');
var routes = new Rlite();
var chain = require('middleware-chain');

router={
	setPath: function (path) {
		location.hash='#/'+path;
	},

	chain: chain,

	registerRoutes: function (config) {
		for(var key in config)
		{
			routes.add(key,config[key]);
		}

		processHash();
		nullHash(config);
		
		window.addEventListener('hashchange', function () {
			processHash();
			nullHash(config);
		});
	},

};

// Hash-based routing
function processHash() {
  var hash = location.hash || '#';
  routes.run(hash.slice(2));
}

function nullHash (config) {

	var hash= location.hash || '#';
	if (!routes.exists(hash.substr(2))) {
		if(config.hasOwnProperty('default'))
		{
			config['default']();
		}
	}
}

module.exports=router;