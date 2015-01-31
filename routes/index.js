
/*
 * GET home page.
 */
 var posts = require('./../posts');

 exports.index = function(req, res){
  var result = posts.getAllPosts(function(error, entities) {
    if(!error) {
      res.render('index', {posts: entities});
    }
    else {
      res.render('index', { Title: 'No posts found :( ' + error});
    }
  });
 };