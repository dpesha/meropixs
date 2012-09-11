define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'text!templates/selectphotos.html',
        'javascripts/libs/facebook/facebook.js',
        'jqueryeffectscore',
        'jqueryeffectsslide'
], function($, _, Backbone, MeroPixs, selectPhotosTemplate, fbApi) {

	var selectImageView = Backbone.View.extend({
		el: $("#select_view"),

		initialize: function() {

		},	

		events : {
					
		},		

		render: function() {

				
		},

		remove: function(){

		},		
		
	});
	return new selectImageView;
});