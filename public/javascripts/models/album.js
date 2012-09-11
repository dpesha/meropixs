define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var albumModel = Backbone.Model.extend({
		defaults: {
			thumb_nail : {
							src    : "https://www.google.com/intl/en_ALL/images/logos/images_logo_lg.gif",
							width  : 0,
							height : 0 
							},
			title		: "Album Title",
			link 		: "#"
		},
		
		initialize: function(){
		}
	});
	
	return albumModel;
});