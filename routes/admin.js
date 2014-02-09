exports.index = function(req, res) {
	if(!req.user) {
		res.redirect('/');
	}

	res.render('admin/index', req.user);	
};

exports.newPost = function(req, res) {
	if(!req.user) {
		res.redirect('/');
	}
	
	res.render('admin/index');
};