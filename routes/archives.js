
/*
 * GET archives page
 */

exports.index = function(req, res){
  res.render('archives', { title: 'Archives' });
};