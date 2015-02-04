var _ = require('lodash');

//Azure stuff
var config = require('./config').init();

//Init
if(!config.azureStorageAccount || !config.azureStorageAccessKey) {
  console.error('Azure environment settings missing, exiting');
  process.exit(1);
}

var uuid = require('node-uuid');
var azure = require('azure-storage');
var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableService = azure.createTableService().withFilter(retryOperations);
var entGen = azure.TableUtilities.entityGenerator;

var config = {
  TableName: 'posts',
  PartitionKey: 'posts'
};

exports.getAllPosts = function(callback) {
  var query = new azure.TableQuery()
  .where('PartitionKey eq ?', config.PartitionKey);

  tableService.queryEntities(config.TableName, query, null, callback);
};

exports.getTopPosts = function(limit, callback) {
  var query = new azure.TableQuery()
  .top(limit)
  .where('PartitionKey eq ?', config.PartitionKey);

  tableService.queryEntities(config.TableName, query, null, callback);
};

exports.getPostById = function(id, callback) {
  tableService.retrieveEntity(
    config.TableName,
    config.PartitionKey,
    id,
    callback
    );
};

exports.insertPost = function(data, callback) {
  console.log('insertPost data: ', JSON.stringify(data));
  //Find rowkey by fetching latest post and incrementing by one
  exports.getAllPosts(function(err, entities, response) {
    var previousRowKey = 1;

    var posts = response.body.value;
    var latestPost = _.last(posts);
    if(latestPost) {
      previousRowKey = parseInt(latestPost.RowKey);
    }

    var rowKey = ++previousRowKey;
    console.log('insertPost - found previous row key:', previousRowKey);
    console.log('insertPost - setting row key:', rowKey);

    var task = {
      PartitionKey: entGen.String(config.PartitionKey),
      RowKey: entGen.String(rowKey.toString()),
      Title: entGen.String(data.Title),
      Slug: entGen.String(data.Slug),
      Content: entGen.String(data.Content),
      CreatedDate: entGen.DateTime(new Date()),
    };

    console.log(JSON.stringify(task));

    tableService.insertEntity(config.TableName, task, callback);
  })
};

exports.updatePost = function(entity, callback) {
  entity.completed._ = true;
  tableService.updateEntity(config.TableName, entity, callback);
};

exports.deletePost = function(rowKey, callback) {
  var task = { 
    PartitionKey: {'_': config.PartitionKey},
    RowKey: {'_': rowKey}
  };

  tableService.deleteEntity(config.TableName, task, callback);
};