//Filename: facebook.js
define(['facebooklib'], function() {
	var FB = this.FB;
	FB.init({
		appId      : '186003581527498', // MERO PIXS DEV _App ID
		channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});
	
 	var getMostLikedPhotosByPageId = function(userId, numberOfPhotos, callback) {
 		var fbPagesMostLikedPhotos = new Object();
 		
 		FB.api({
 			method : 'fql.query',
 			query  : 'SELECT object_id, like_info FROM photo WHERE aid in (SELECT aid FROM album WHERE owner=' + userId + ') order by created desc limit 100'
 		},

 		function(data) {
 			//sorts the results in descending order of number of likes
 			data.sort(function(a,b) {
 				var a_like_count = parseInt(a.like_info["like_count"]);
 				var b_like_count = parseInt(b.like_info["like_count"]);
 				if (a_like_count < b_like_count)
 					return 1;
 				if (a_like_count > b_like_count)
 					return -1;
 				return 0;
 			});

 			//Stores the top "n" of most liked photos	
 			fbPagesMostLikedPhotos = data.slice(0, numberOfPhotos);
			if(callback) {
				callback(fbPagesMostLikedPhotos);
			}
 		});
 	};
 	
 	var getPhotoInfos = function(photoIds, callback) {
 		var object_ids = new Array();
 		for(i =0; i < photoIds.length; i++) {
 			object_ids.push(photoIds[i]["object_id"]);
 		}

 		FB.api({
 			method: 'fql.query',
 			query:  'SELECT images FROM photo WHERE object_id in (' + object_ids.join(",") +')'
 		},
 		function(data) {
 			var photos = new Array();
 			for(var v=0; v<data.length; v++) { 				
 				var images = data[v]["images"];
 				var image = images[0];
 				photos.push({
 					image : image["source"], 
 					thumb : image["source"], 
 					title : '',	
 					url   : '' 
 				});
 			}  
 			
 			if(callback) {
 				callback(photos);
 			}
	    });
 	};


	var storeFBPage = function(pageresponse, callback) {
		var id           = pageresponse["id"];
		var name         = pageresponse["name"];
		var link         = pageresponse["link"];
		var cover        = pageresponse["cover"];
		var cover_id     = cover["cover_id"];
		var cover_source = cover["source"];
		var fbPageInfo   = {id:id, name:name, link:link, cover:cover_source};

		FB.api("/" + cover_id, function(data) { 			
			fbPageInfo["cover_width"] = data["width"];
			fbPageInfo["cover_height"] = data["height"]; 
			if(callback) {
				callback(fbPageInfo);
			}
		});	
	}
	
	var getFBPageInfo = function(fbpage, callback) {
		FB.api(fbpage, 
				(function(callback) {
					return function(pageresponse) {
						storeFBPage(pageresponse, callback);						
					}
				})(callback));
	};

	return {
		getFBPagesInfo : function(listOfFBPages, callback) {
			var fbPagesInfo = new Array();
			var count = 0;
			var insertFbPageInfo = function(response) {
				fbPagesInfo.push(response);
				count = count + 1;				
				if (count === listOfFBPages.length && callback) {
					callback(fbPagesInfo);
				}
			}		
			for (var i=0; i < listOfFBPages.length; i++) {
				getFBPageInfo(listOfFBPages[i], insertFbPageInfo);
			}
		},
		
		getMostLikedPhotosByPageId : function(id, no_of_photos_per_page, callback) {
			getMostLikedPhotosByPageId(id, no_of_photos_per_page, function(response) {
				getPhotoInfos(response, callback);
			});			
		}
	};
});