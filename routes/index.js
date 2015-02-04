
/*
 * GET home page.
 */
 var _ = require('lodash');
 var posts = require('./../posts');

 exports.index = function(req, res){
  var result = posts.getAllPosts(function(error, entities, response) {
    if(!error) {
      var posts = response.body.value;
      var sortedPosts = _.sortBy(posts, 'RowKey').reverse();
      res.render('index', {posts: sortedPosts});
    }
    else {
      res.render('index', { Title: 'No posts found :( ' + error});
    }
  });
 };