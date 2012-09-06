exports.index = function(req, res){
	res.render('index', 
		{ title: 'GetGlimpses'}
	  )
};

exports.error=function(req,res){
	res.render('error', {title: 'Ooops!', message:'Something wrong with request'});
}

exports.fbcallback=function(req,res){
	res.render('fbcallback', {title: 'Success'});
}