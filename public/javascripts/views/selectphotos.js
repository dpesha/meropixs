define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'collections/selectphotos',
        'text!templates/selectphotos.html',
        'javascripts/libs/facebook/facebook.js',
        'jqueryeffectscore',
        'jqueryeffectsslide'
], function($, _, Backbone, MeroPixs, selectCollection, selectPhotosTemplate, fbApi) {

	var selectPhotoView = Backbone.View.extend({
		el: $("#select_view"),

		initialize: function() {
			selectCollection.bind('add', this.render, this);
			selectCollection.bind('remove', this.render, this);
			//selectCollection.bind('change', this.render, this);
		},	

		events : {
			"click .select" : "remove"		
		},		

		render: function() {

			this.collection=selectCollection;			
			var data = {
						photos: this.collection.models,
						_: _
					};
					var compiledTemplate = _.template(selectPhotosTemplate, data);

					this.el.html(compiledTemplate);	
		},

		remove: function(ev){
			var photoId = $(ev.target).data('select');
			selectCollection.remove(selectCollection.getByCid(photoId));
		},

		move:function(){

		},		
		
	});
	return new selectPhotoView;
});