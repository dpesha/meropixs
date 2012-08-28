//Filename: views/home/polaroid
define([
        'jquery',
        'underscore',
        'backbone',
        'collections/polaroids',
        'text!templates/home/polaroid.html',
        'javascripts/libs/facebook/facebook.js'
], function($, _, Backbone, polaroidsCollection, polaroidTemplate, fbApi) {
	
	var rendered = false;
	
	var polaroidView = Backbone.View.extend({
		el: $(".gallery"),
		initialize: function() {
		},	

		events : {
			"click .polaroid" : "startSlideShow"			
		},

		startSlideShow: function(ev) {
			var polaroidId = $(ev.target).data('polaroid');
			Backbone.history.navigate('/slideshow/' + polaroidId, {trigger:true});
		},

		hideView: function() {			
		},

		render: function(){			
			
			$("#slide_container").hide();
			
			var listOfFBPages = ["/naturalwondersofnepal", "/visitjapan","/NASA","/198320350202343","/natgeo","/KeepExploring"];
			this.collection = polaroidsCollection;

			if (rendered) {
				$("#supersized-loader").hide();	
				$("#header").show();
				$("#footer").show();
				$("#gallery_container").show();	
				SS.api.rebuild(); 
				return;				
			}
			
			//Fetch data and render
			fbApi.getFBPagesInfo(listOfFBPages, function(response){
				for (var i = 0; i< response.length; i++) {
					var pageData = response[i];
					this.collection = polaroidsCollection.add({ 
						label: pageData["name"], 
						cover_photo: {"src": pageData["cover"], "width": pageData["cover_width"], "height": pageData["cover_height"]},
						link: pageData["link"],
						id: pageData["id"]
					});
				}

				var data = {
						polaroids: this.collection.models,
						_: _
				};
				var compiledTemplate = _.template(polaroidTemplate, data);

				$(".gallery").html(compiledTemplate);
				
				rendered = true;

			});	


		}
	});
	return new polaroidView;
});
