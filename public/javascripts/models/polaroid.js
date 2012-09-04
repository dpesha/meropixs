define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var polaroidModel = Backbone.Model.extend({
		defaults: {
			cover_photo : {
							src    : "https://www.google.com/intl/en_ALL/images/logos/images_logo_lg.gif",
							width  : 0,
							height : 0 
							},
			label		: "label",
			link 		: "#"
		},
		
		initialize: function(){
		}
	});
	
	return polaroidModel;
});