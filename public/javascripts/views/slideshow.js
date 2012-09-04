//Filename: views/home/polaroid
define([
        'jquery',
        'underscore',
        'backbone', 
        'meropixs',
        'jqueryeasing',
        'supersized',
        'supersizedshutter',         
        'touchevent',
        'javascripts/libs/facebook/facebook.js'
], function($, _, Backbone, MeroPixs, jqueryeasing,supersized, supersizedshutter,touchevent, fbApi) {	
 	/** Global Variables 
 	---------------------------------------------------*/
 	var no_of_photos_per_page = 15;
 	
	var slideView = Backbone.View.extend({		
		el: $(".gallery"),
		initialize: function() {	
			
		},

		close: function() {
			var dfd = $.Deferred();
			$("#slide_container").fadeOut(1000, function(){
				SS.api.rebuild();
				dfd.resolve();	
			});
			return dfd.promise();				
		},

		render: function(opts) {
			id = opts["id"];
			
			var promise = MeroPixs.getMostLikedPhotosByPageId(id);			
			$.when(promise).then(function(response){
				//page transition
				
				$("#slide_container").css('visibility','visible').hide().fadeIn(1000);
				// initialize slideshow	        
				var clonedata = response.slice(0);
				$.supersized({
						slide_links:'blank',
						slides : clonedata
				});
				$("#supersized-loader").css("display", "none");

				
				
			});					
		}		
	});
	return new slideView;
});
	
