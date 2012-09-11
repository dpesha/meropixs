define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'javascripts/libs/facebook/facebook.js',
        'views/albumlist',
        'views/selectphotos'
], function($, _, Backbone, MeroPixs, fbApi, albumListView, selectPhotosView) {

	var customizeView = Backbone.View.extend({
		el: $("#customize_container"),
		bp: $('#popup_background'),

		initialize: function() {

		},	

		events : {
					
		},

		close: function() {
			this.bp.fadeOut("slow");
			this.el.fadeOut("slow");	
		},

		render: function() {
			this.center();		
			this.bp.css({"opacity":"0.7"});
			this.bp.fadeIn("slow");
			this.el.fadeIn("slow");
			MeroPixs.subView(albumListView);
			selectPhotosView.render();			
		},

		center: function(){
			//request data for centering
			var windowWidth = document.documentElement.clientWidth;
			var windowHeight = document.documentElement.clientHeight;
			var popupHeight = this.el.height();
			var popupWidth = this.el.width();
			//centering
			this.el.css({
				"position": "absolute",
				"top": windowHeight / 2 - popupHeight / 2,
				"left": windowWidth / 2 - popupWidth / 2
			});

			this.bp.css({
				"height": windowHeight
			});
		},
		save: function(){

		},
				
	});

	return new customizeView;
});