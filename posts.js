//Azure stuff
var config = require('./config').init();

//Init
if(!config.azureStorageAccount || !config.azureStorageAccessKey) {
  console.error('Azure environment settings missing, exiting');
  process.exit(1);
}

var azure = require('azure');
var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableService = azure.createTableService().withFilter(retryOperations);

var config = {
  TableName: 'posts',
  PartitionKey: 'posts'
};

exports.getAllPosts = function(callback) {
  var query = azure.TableQuery
  .select()
  .from(config.TableName)
  .where('PartitionKey eq ?', config.PartitionKey);

  tableService.queryEntities(query, callback);
};

exports.getPostById = function(id, callback) {
  tableService.queryEntity(
    config.TableName,
    config.PartitionKey,
    id,
    callback
  );
};
