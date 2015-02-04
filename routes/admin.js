var _ = require('lodash');
var posts = require('./../posts');

exports.index = function(req, res) {
  if(!req.user) {
    res.redirect('/');
  }

  var result = posts.getAllPosts(function(error, entities, response) {
    if(!error) {
      var posts = response.body.value;

      res.render(
        'admin/index',
        {
          layout: 'admin',
          posts: posts
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
  if(!req.user) {
    res.redirect('/');
  }
  
  res.render('admin/new', { layout: 'admin' });
};

exports.addPostData = function(req, res) {
  if(!req.user) {
    res.redirect('/');
  }

  var error = "";
  var message = "";

  if(!req.body.title) {
    error = "Title missing.";
  }

  if(!req.body.content) {
    error += " Content missing."
  }

  if(!error) {
    var draft = req.body.draft === "on";

    //Save data
    var post = {
      Title: req.body.title,
      Slug: "",
      Content: req.body.content,
      Draft: draft
    };

    posts.insertPost(post, function(error, entities, response) {
      if(!error) {
        message = 'Post added';
      }

      res.redirect('/admin');
    });
  }
  else {
    res.render('admin/new', {
      layout: 'admin', 
      message: message,
      error: error,
    });      
  }
}

exports.deletePost = function(req, res) {
  if(!req.user) {
    res.redirect('/');
  }

  var rowKey = req.body.rowKey;

  if(!rowKey) {
    res.render(
      'admin/index',
      {
        layout: 'admin',
        posts: posts,
        error: 'No rowKey'
      });
  }

  posts.deletePost(rowKey, function(error, entity, response) {
    if(!error) {
      var message = 'Message with rowKey ' + rowKey + ' deleted';
    }

    posts.getAllPosts(function(err, entities, response) {
      if(!err) {
        var posts = response.body.value;
        var sortedPosts = _.sortBy(posts, 'RowKey').reverse();
        res.render(
          'admin/index', 
          {
            layout: 'admin',
            posts: sortedPosts,
            error: err + error,
            message: message
        });
      }
      else {
        res.render('admin/index', { layout: 'admin', Title: 'No posts found :( ', error: err  + error});
      }
    });
    
  });
}

exports.editPost = function(req, res) {
  if(!req.user) {
    res.redirect('/');
  }

  var rowKey = req.params.id;

  posts.getPostById(rowKey, function(error, entity, response) {
    if(!error) {
      console.log(response.body);
      res.render('admin/edit', { layout: 'admin', post: response.body });
    }
  });
}
