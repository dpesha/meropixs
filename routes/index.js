
/*
 * GET home page.
 */

exports.index = function(req, res){
	/*if(req.session.auth){
		user=req.sessions.auth.twitter.screen_name;
	}*/
	res.render('index', 
		{ title: 'GetGlimpses'
	  	  //locals: {user:user}
		}
	  )
};