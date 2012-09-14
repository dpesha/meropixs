require('../db-connect.js');
var User = require('../app/models/User');

// TODO Add Authentication

//READ
exports.listUsers=function(req,res){
	
	return User.find(function (err, users) {
		if (!err) {
	    	return res.send(users);
	    } else {
	    	return console.log(err);
	    }
	});
};

//FB Login
exports.getFBLogin=function(req,res){
	if(req.session.auth){
		return res.send({
			name:req.session.auth.facebook.user.name, 
			id:req.session.auth.facebook.user.id});
	} else {
		return res.send();
	}
};


//CREATE
exports.newUser=function(req,res){
	var user = new User(req.body.user);
	return user.save(function (err){	  
	    if (!err) {
	      console.log('created user');
	      return res.send(user);
	    } else {
	      return console.log(err);
	    }	    
	});	  
};

// READ
exports.viewUser=function(req,res){
	return User.findById(req.params.id, function (err, user) {
    	if (!err) {
      		return res.send(user);
    	} else {
      		return console.log(err);
    	}
    });	
};

//UPDATE
exports.updateUser=function(req,res){
	return User.findById(req.params.id, function (err, user) {
		user.name = req.body.user.name;
    	user.email = req.body.user.email;    
    	return user.save(function (err) {
      		if (!err) {
        		console.log("updated user");
        		return res.send(user);
      		} else {
        		console.log(err);
      		}
       	});
  	});
};

//DELTE
exports.deleteUser=function(req,res){
	return User.findById(req.params.id, function (err, user) {
	    return user.remove(function (err) {
	    	if (!err) {
	        	console.log("removed");
	        	return res.send('');
	      	} else {
	        	console.log(err);
	      	}
    	});
  	});
};