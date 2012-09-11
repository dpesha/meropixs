define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/albums',
        'text!templates/albumlist.html',
        'javascripts/libs/facebook/facebook.js',
        'views/photolist'
], function($, _, Backbone, MeroPixs, albumsCollection, albumListTemplate, fbApi, photoListView) {

	var rendered = false;
	var albumListView = Backbone.View.extend({
		el: $("#album_view"),

		initialize: function() {
			
		},	

		events : {
			"click .album" : "select",		
		},

		close: function() {
			var dfd = $.Deferred();
			this.el.hide("slide", { direction: "left" }, 1000, function(){
				dfd.resolve();
			});
			return dfd.promise();
		},

		select:function(){
			MeroPixs.subView(photoListView);
		},

		render: function() {

			if (rendered) {
				this.el.show("slide", { direction: "right" }, 1000);
				return;							
			}
			this.collection=albumsCollection;
			albumsCollection.add({ 
							title: "Album1",							
						});
			albumsCollection.add({ 
							title: "Album2"							
						});

			var data = {
						albums: this.collection.models,
						_: _
					};
					var compiledTemplate = _.template(albumListTemplate, data);

					this.el.html(compiledTemplate);	
			rendered=true;
		},		
		
	});
	return new albumListView;
});
