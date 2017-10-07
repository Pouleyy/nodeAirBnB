module.exports = function() {
	var config = {
		port: 9000,
		db: "mongodb://localhost:27017/testingesup",
	};
	// override some globals
	process.env.PORT = config.port;
	return config;
}();
