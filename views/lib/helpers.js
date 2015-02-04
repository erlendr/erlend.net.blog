var moment = require('moment');

exports.toUpperCase = function (msg) {
	return msg.toUpperCase();
};

exports.toSeoTitle = function (str) {
  if(!str) return "";
  return encodeURIComponent(str.replace(/\s+/g, "-").toLowerCase());
};

exports.formatDate = function(date) {
  return moment(date).format('dddd D MMMM YYYY, HH.mm');
};