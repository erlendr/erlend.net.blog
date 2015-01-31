exports.init = function() {
	var fs = require('fs');
	var nconf = require('nconf');

	//
	// Setup nconf to use (in-order):
	//   1. Command-line arguments
	//   2. Environment variables
	//
	nconf.argv()
	.env();

	return {
		adminUsername : nconf.get('ADMIN_USERNAME'),
		adminPassword : nconf.get('ADMIN_PASSWORD'),
		azureStorageAccount: nconf.get('AZURE_STORAGE_ACCOUNT'),
		azureStorageAccessKey: nconf.get('AZURE_STORAGE_ACCESS_KEY')
	};
};