define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/albums',
        'text!templates/albumlist.html',
        'javascripts/libs/facebook/facebook.js',
        'views/photolist'
], function($, _, Backbone, MeroPixs, albumsCollection, albumListTemplate, fbApi) {

	var rendered = false;	

	var albumListView = Backbone.View.extend({
		el: $("#album_view"),

		initialize: function() {
			Backbone.pubSub.bind('albumlist',this.show, this);
		},	

		events : {
			"click .album" : "select",		
		},

		close: function() {
			var dfd = $.Deferred();
			this.el.hide("slide", { direction: "right" }, 500, function(){
				dfd.resolve();
			});
			return dfd.promise();
		},

		select:function(){
			Backbone.pubSub.trigger('photolist');
		},

		show:function(){
			MeroPixs.subView(this);
		},

		render: function() {			

			if (rendered) {
				this.el.show("slide", { direction: "left" }, 500);
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
