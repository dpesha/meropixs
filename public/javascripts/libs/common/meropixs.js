define(['jquery','javascripts/libs/facebook/facebook.js'], 

function($, fbApi) {

	var meropixs = {};
	meropixs.createCache = function(requestFunction) {
		var cache = {};
		return function(key) {
			if ( !cache[ key ] ) {
				cache[ key ] = requestFunction(key);
			} 		
			return cache[ key ];
		};
	};

	meropixs.AppView = function() {
		var currentView;
		return function(view, opts) {
			if (currentView){
				currentView.close().done(function(){
					currentView = view;
					currentView.render(opts);
				});
			} else {
				currentView = view;
				currentView.render(opts);
			}	

		};
	};

	
	meropixs.getMostLikedPhotosByPageId = meropixs.createCache(function(pageId) {
		var mostLikedPhotosInfoPromise = fbApi.getMostLikedPhotosByPageId(pageId,15);
		return mostLikedPhotosInfoPromise;
	});

	meropixs.showView = meropixs.AppView();

	return meropixs;
});