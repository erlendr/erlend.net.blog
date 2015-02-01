var posts = require('./../posts');

exports.index = function(req, res) {
  /*if(!req.user) {
    res.redirect('/');
  }*/

  var result = posts.getAllPosts(function(error, entities) {
    if(!error) {
      res.render(
        'admin/index',
        {
          layout: 'admin',
          posts: entities
        });
    }
    else {
      res.render(
        'index', 
        {
          layout: 'admin',
          error: error
        }
        );
    }
  });
};

exports.addPost = function(req, res) {
  /*if(!req.user) {
    res.redirect('/');
  }*/
  
  res.render('admin/new', { layout: 'admin' });
};