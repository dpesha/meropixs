/*
 * GET Registration Page
 */

exports.register = function(req, res){
	res.render('register', 
		{ title: 'GetGlimpses'}
	  )
};