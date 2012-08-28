define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var photoModel = Backbone.Model.extend({
		defaults: {
			src : "https://www.google.com/intl/en_ALL/images/logos/images_logo_lg.gif"
		},
		
		initialize: function(){
		}
	});
	return photoModel;
});