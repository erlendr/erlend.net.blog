
/*
 * GET single post.
 */
 var posts = require('./../posts');

 exports.index = function(req, res){
  var result = posts.getPostById(req.params.id, function(error, entity, response) {
    if(!error) {
      res.render('singlepost', response.body);
    }
    else {
      res.render('singlepost', {Title: 'No post found :('});
    }
  });
};