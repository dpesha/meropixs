//Filename: views/home/polaroid
define([
        'jquery',
        'underscore',
        'backbone', 
        'jqueryeasing',
        'supersized',
        'supersizedshutter',         
        'touchevent',
        // Pull in the Collection module from above
        'collections/slides',
        'javascripts/libs/facebook/facebook.js'
], function($, _, Backbone, jqueryeasing,supersized, supersizedshutter,touchevent, slidesCollection, fbApi) {	
 	/** Global Variables 
 	---------------------------------------------------*/
 	var no_of_photos_per_page = 15;
 	
	var slideView = Backbone.View.extend({		
		el: $(".gallery"),
		initialize: function() {	
			
		},
		render: function(id) {
			fbApi.getMostLikedPhotosByPageId(id, no_of_photos_per_page, function(response){
				//page transition
				$("#header").fadeOut('slow');
				$("#footer").fadeOut('slow');
				$("#supersized-loader").hide();				
				$("#gallery_container").fadeOut('slow',function() {					
					// initialize slideshow	        
					$.supersized({
						slide_links:'blank',
						slides : response
					});
					$("#slide_container").css('visibility','visible').hide().fadeIn("slow");
				});
			});					
		}		
	});
	return new slideView;
});
	
