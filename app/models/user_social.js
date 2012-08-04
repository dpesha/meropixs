var UserSocialSchema = new Schema({
    userId: String,  
    snsId: String,
    snsUserId: String,
    accessToken: String    
});

var exports = module.exports = UserSocial = mongoose.model('UserSocial', UserSocialSchema);