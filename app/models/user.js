var exports = module.exports = everyauth = require('everyauth')
  , conf = require('./../../config/oauth_providers');

var UserSchema = new Schema({  
    name: String,
    email: String        
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
    .scope('user_photos')    
    .findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {      
    var id = fbUserMetadata.id;     
    var promise = this.Promise();
    Social.findOne({sns:'facebook'},function(err, result){
      var snsId=result.snsId;

      UserSocial.findOne({snsUserId: id, snsId: snsId}, function(err,res){

        var userSocial;
        var user;

        if(!res){

          // create social info
          userSocial = new UserSocial();
          userSocial.snsId = snsId;
          userSocial.snsUserId = id;
          userSocial.accessToken = accessToken;

          // create user info
          user = new User();
          user.name = fbUserMetadata.name;
          user.email = fbUserMetadata.email;              
          user.save();
          
          // store user id into user_social doc
          userSocial.userId=user._id;
          userSocial.save();
          promise.fulfill(user);

        }
        else {

          userSocial=res;
          User.findOne({_id:res.userId},function(err,re){

            var usr;
            if(!re){
              // create user info
              usr = new User();
              usr.name = fbUserMetadata.name;
              usr.email = fbUserMetadata.email;              
              usr.save();
            }
            else {
              usr=re;
            }
            promise.fulfill(usr);
          });
        }
      });
    });    
    return promise;
  }).redirectPath('/');

