
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log("req.cookies.key");
	console.log(req.cookies.key);
	res.render('index', { title: 'BigBlueButton HTML5 Client API Mate' });
};