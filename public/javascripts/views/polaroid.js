//Filename: views/home/polaroid
define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/polaroids',
        'text!templates/polaroid.html',
        'javascripts/libs/facebook/facebook.js',
        'views/customizeslide',
        'views/albumlist',
        'views/login',
        'jqueryeffectscore',
        'jqueryeffectsslide'
], function($, _, Backbone, MeroPixs, polaroidsCollection, polaroidTemplate, fbApi, customizeView, albumListView, loginView) {
	
	var rendered = false;
	var listOfFBPages = ["/naturalwondersofnepal", "/visitjapan","/NASA","/198320350202343","/natgeo","/KeepExploring"];
	var fbPagesInfoPromise = {};
	
	var polaroidView = Backbone.View.extend({
		el: $(".gallery"),

		initialize: function() {
			fbPagesInfoPromise = fbApi.getFBPagesInfo(listOfFBPages);
			loginView.render();
		},	

		events : {
			"click .polaroid" : "startSlideShow",
			"click .actions": "showPopup"			
		},

		close: function() {
			var dfd = $.Deferred();
			//fade out header
			$("#header").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0});			
			//fade out footer
			$("#footer").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, function(){				
				// slide out gallery_container
				$("#gallery_container").hide("slide", { direction: "left" }, 2000, function(){
					//Navigate to the slideshow page
					dfd.resolve();
					
				});				
			});
			return dfd.promise();
		},

		startSlideShow: function(ev) {
			ev.preventDefault();			
			var polaroidId = $(ev.target).data('polaroid');
			$("#supersized-loader").css("display", "block");
			Backbone.history.navigate('/slideshow/' + polaroidId, {trigger:true});				
		},

		showPopup: function(ev){
			ev.preventDefault();
			customizeView.render();

		},

		render: function() {

			if (rendered) {
				$("#gallery_container").show("slide", { direction: "left" }, 2000, function() {
					//fade in header
					$("#header").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});	
					//fade in footer
					$("#footer").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
				});						
				return;				
			}
			
			this.collection = polaroidsCollection;
			//Fetch data and render
			fbPagesInfoPromise.then(
				function(response){
					for (var i = 0; i < response.length; i++) {
						var pageData = response[i];
						this.collection = polaroidsCollection.add({ 
							label: pageData["name"], 
							cover_photo: {"src": pageData["cover"], "width": pageData["cover_width"], "height": pageData["cover_height"]},
							link: pageData["link"],
							id: pageData["id"]
						});
						
						//trigger caching
						MeroPixs.getMostLikedPhotosByPageId(pageData["id"]);					
					};

					var data = {
						polaroids: this.collection.models,
						_: _
					};
					var compiledTemplate = _.template(polaroidTemplate, data);

					$(".gallery").html(compiledTemplate);

					$("#supersized-loader").css("display", "none");

					rendered = true;
				}
			);
		}
	});
	return new polaroidView;
});
