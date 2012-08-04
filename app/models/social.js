var SocialSchema = new Schema({
    sns: String,
    snsId: String
});

var exports = module.exports = Social = mongoose.model('Social', SocialSchema);

// Pre-load database with master data
Social.find(function(err, result){
	
	if(result.length===0){
		
		var social=new Social();
		social.sns='facebook';
		social.snsId="1";
		social.save();

		social=new Social();
		social.sns='twitter';
		social.snsId="2";
		social.save();

	}

});