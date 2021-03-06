var exports = module.exports = everyauth = require('everyauth')
  , conf = require('./../../config/oauth_providers');
var url = require('url');  

var UserSchema = new Schema({  
    name: String,
    email: String,
    social:[{
      provider:String,
      snsUserId:String,
      accessToken:String
    }]        
});

var exports = module.exports = User = mongoose.model('User', UserSchema);

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
    .authQueryParam('display', 'popup')
    .scope('user_photos,email')
    .handleAuthCallbackError( function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      , errorDesc = parsedUrl.query.error_description;
      res.render('error', {title: 'Ooops!', message:errorDesc });
    })    
    .findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {      
      var id = fbUserMetadata.id;     
      var promise = this.Promise();
      User.findOne({'social.provider':'facebook','social.snsUserId':id},function(err, result){

        var user;
        if(!result){

          // create user info
          user = new User();
          user.name = fbUserMetadata.name;
          user.email = fbUserMetadata.email;
          user.social.push({provider:'facebook', snsUserId:id, accessToken:accessToken});              
          user.save();
          promise.fulfill(user);

        }
        else {
          user=result;
          promise.fulfill(user);
        }
      });
    return promise;
  }).redirectPath('/auth/facebook/cb/');

