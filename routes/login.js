exports.index = function(req, res) {
  if(req.user) {
    res.redirect('/admin');
  }

  res.render('login');
};

exports.login = function(req, res) {
};