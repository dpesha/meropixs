/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , everyauth = require('everyauth')
  , util =require('util')
  , conf = require('./config/oauth_providers')
  , mongoose = require('mongoose');
  
// Database
mongoose.connect('mongodb://localhost/meropixsdb');
// Schema
var Schema = mongoose.Schema; 

var UserSchema = new Schema({
    facebookId: String,  
    name: String,
    accessToken: String    
});

var User = mongoose.model('User', UserSchema);

// OAuth Implemenation with everyauth
everyauth.everymodule.findUserById(function (userId, callback) {
    User.findById(userId,function(err,user){
      if(err) {callback(err,null)};
      if(user) {callback(null,user)}
    });    
});  

everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .scope('user_photos')    
    .findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {      
     var id = fbUserMetadata.id;     
     var promise = this.Promise();    
    User.findOne({facebookId: id}, function(err, result) {
      var user;
      if(!result) {
        user = new User();
        user.facebookId = id;
        user.name = fbUserMetadata.name;
        user.accessToken=accessToken;      
        user.save();
      } else {
      user = result;
      }
      promise.fulfill(user);
    });
    return promise;
  }).redirectPath('/'); 


// create Server  

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "secret"}));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public')); 
  app.use(everyauth.middleware());     
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
everyauth.helpExpress(app);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


