define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/photos',
        'collections/selectphotos',
        'text!templates/photolist.html',
        'javascripts/libs/facebook/facebook.js'
], function($, _, Backbone, MeroPixs, photosCollection, selectCollection, photoListTemplate, fbApi){

	var rendered = false;	
	// setup events
  	Backbone.pubSub=_.extend({},Backbone.Events);

	var photoListView = Backbone.View.extend({
		el: $("#photo_view"),

		initialize: function() {
			Backbone.pubSub.bind('photolist',this.show, this);
		},	

		events : {
			"click .photo" : "select",	
			"click .back" : "back",	
		},

		select: function(ev) {
			var photoId = $(ev.target).data('photo');
			selectCollection.add(photosCollection.getByCid(photoId));
		},

		show:function(){
			MeroPixs.subView(this);
		},

		close: function(){
			var dfd = $.Deferred();
			this.el.hide("slide", { direction: "left" }, 500, function(){
				dfd.resolve();
			});
			return dfd.promise();
		},

		back:function(){
			Backbone.pubSub.trigger('albumlist');			
		},

		render: function() {

			
			if (rendered) {
				this.el.show("slide", { direction: "right" }, 500);
				return;							
			}

			this.el.css('visibility','visible').fadeIn(0);
						
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
			rendered=true;
		},		
		
	});
	return new photoListView;
});