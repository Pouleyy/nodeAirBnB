module.exports = function() {
	var config = {
		port: 9000,
		uri: 'mongodb://admin:admin@' +
		'cluster0-shard-00-00-jy9vv.mongodb.net:27017,' +
		'cluster0-shard-00-01-jy9vv.mongodb.net:27017,' +
		'cluster0-shard-00-02-jy9vv.mongodb.net:27017' +
		'/airBnb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
	};
	// override some globals
	process.env.PORT = 9000;
	return config;
}();
