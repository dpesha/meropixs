define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/photos',
        'text!templates/photolist.html',
        'views/albumlist',
        'javascripts/libs/facebook/facebook.js'
], function($, _, Backbone, MeroPixs, photosCollection, photoListTemplate, albumListView,fbApi){

	var photoListView = Backbone.View.extend({
		el: $("#photo_view"),

		initialize: function() {
			

		},	

		events : {
			"click .photo" : "select",	
			"click .back" : "back",	
		},

		select: function() {
			
		},

		close: function(){
			var dfd = $.Deferred();
			this.el.hide("slide", { direction: "right" }, 1000, function(){
				dfd.resolve();
			});
			return dfd.promise();
		},

		back:function(){
			MeroPixs.subView(albumListView);
		},

		render: function() {

			this.el.css('visibility','visible').fadeIn(1000);
			
			this.collection=photosCollection;
			photosCollection.add({ 
							caption: "Photo1",							
						});
			photosCollection.add({ 
							caption: "Photo2"							
						});

			var data = {
						photos: this.collection.models,
						_: _
					};
					var compiledTemplate = _.template(photoListTemplate, data);

					this.el.html(compiledTemplate);	
		},		
		
	});
	return new photoListView;
});