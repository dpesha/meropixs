// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");


/* Page History Management*/

var HistoryManager= new function(){
	this.History='';
    this.init=function(window,undefined){
	    this.History = window.History; // Note: We are using a capital H instead of a lower h
	    if ( !this.History.enabled ) {
	         // History.js is disabled for this browser.
	         // This is because we can optionally choose to support HTML4 browsers or not.
	        return false;
	    }

	    // Bind to StateChange Event
	    this.History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
	        var State = this.History.getState(); // Note: We are using History.getState() instead of event.state
	        if(State.title===''){
	        	document.location.href = State.url;
	        }
	    });	    
    }    

};
HistoryManager.init(window);

/**********History Management End****************/


 // Init the SDK upon load
 window.fbAsyncInit = function() {

 	FB.init({
   		appId      : '186003581527498', // MERO PIXS DEV _App ID
    	channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
    	status     : true, // check login status
    	cookie     : true, // enable cookies to allow the server to access the session
    	xfbml      : true  // parse XFBML
	});

 	/** Global Variables 
 	---------------------------------------------------*/
 	var fbPagesInfo = new Object();
 	var fbPagesMostLikedPhotos = new Object();
 	var smallScreenMediaFlg = navigator.userAgent.match(/Android/i)  
 								|| navigator.userAgent.match(/iPhone/i)
 								|| navigator.userAgent.match(/iPad/i)
 								|| navigator.userAgent.match(/iPod/i);
 	var no_of_photos_per_page = 15;
 	var listOfFBPages = ["/naturalwondersofnepal", "/visitjapan","/NASA","/visitcostarica","/natgeo","/KeepExploring"];
 	var no_of_polaroids = listOfFBPages.length;
 	var drawn = 0;

 	var storeFBPage = function(pageresponse) {
 		var id           = pageresponse["id"];
 		var name         = pageresponse["name"];
 		var link         = pageresponse["link"];
 		var cover        = pageresponse["cover"];
 		var cover_id     = cover["cover_id"];
 		var cover_source = cover["source"];

 		//Store FB pages information
 		fbPagesInfo[id]  = { id:id, name:name, link:link, cover:cover_source};

 		FB.api("/" + cover_id, function(data) {
 			drawPolaroid({
 				id           : id, 
 				name         : name, 
 				link         : link, 
 				cover        : cover_source,
 				cover_width  : data["width"],
 				cover_height : data["height"]
 			}, animate);
 		});
 		getMostLikedPhotosByPageId(id, no_of_photos_per_page); 		
 	}

 	var animate = function() {
 		drawn = drawn + 1;
 		if (no_of_polaroids === drawn) {
 			$("#supersized-loader").addClass("hide");
 			$("#social").fadeIn(1000);
 			$("#container").fadeIn(1000); 			
 			drawn = 0;
 		}
 	}

 	var getMostLikedPhotosByPageId = function(userId, numberOfPhotos) {
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
 			fbPagesMostLikedPhotos[userId] = data.slice(0, numberOfPhotos);
 		});
 	}

 	var slidePhotos = function(userId) {
 		var photos = fbPagesMostLikedPhotos[userId];

 		var object_ids = new Array();
 		for(i =0; i < photos.length; i++) {
 			object_ids.push(photos[i]["object_id"]);
 		}

 		FB.api({
 			method: 'fql.query',
 			query:  'SELECT images FROM photo WHERE object_id in (' + object_ids.join(",") +')'
 		},
 		function(data) {
 			var slides = new Array();
 			for(var v=0; v<data.length; v++) { 				
 				var images = data[v]["images"];

 				if (smallScreenMediaFlg) {
 					var image = images[3];
 				} else {
 					var image = images[0];
 				}

 				slides.push({
 					image : image["source"], 
 					thumb : image["source"], 
 					title : "Courtesy : <a href='" + fbPagesInfo[userId]["link"] + "' target='_blank'>" + fbPagesInfo[userId]["name"] + "</a>",	
 					url   : '' 
 				});
 			}
 			 //page transition
	        $("#social").fadeOut('slow');
	        $("#container").fadeOut('slow',function() {
	        	$("#supersized-loader").removeClass("hide");
	        	// initialize slideshow	        
	        	$.supersized({
	        		slide_links:'blank',
	        		slides : slides
	        	});
	        	$("#slide_container").fadeIn("slow");
	        			
	    	});
 			HistoryManager.History.pushState({state:1}, "MeroPixs", "?state=1"); 
	       
	    });
 	}

 	var drawPolaroid = function(data, callback) {
 		
 		var width  = data["cover_width"];
 		var height = data["cover_height"];
 		
 		if (3 * width > 4 * height) {
			var photo =$("<div class='polaroid'><a class='pic_link' href='javascript:void()'>" +
			             "<img src='" + data["cover"] + "' style='max-height:210px'></img></a></div>");
       	} else {
			var photo =$("<div class='polaroid'><a class='pic_link' href='javascript:void()'>" + 
				         "<img src='" + data["cover"] +"' style='max-width:280px'></img></a></div>");
 		}
 		
 		var photo =$("<div class='polaroid'><a class='pic_link' href='javascript:void()'>" +
	             "<img src='" + data["cover"] + "'></img></a></div>");
 		
 		// SKS-S
 		
 		var change = $("<div class='change' style='display:'><a href='javascript:void(0);'><img src='/images/change.png'></img></a></div>");
 		var userInput = $("<div class='userInput'></div>");
 		var subDiv = $("<div class='subDiv'></div>");
 		var tbInput = $("<input class='tbInput' type='text' />");
 		
 		var okBtn = $("<button>OK</button>");
 		var cxlBtn = $("<button>Cancel</button>");
 		
 		subDiv.append("<span style='color:#ffffff;'>Enter FB Page Name:</span><br/>");
 		subDiv.append(tbInput);
 		subDiv.append("<br/><br/>");
 		subDiv.append(okBtn);
 		subDiv.append("&nbsp;&nbsp;");
 		subDiv.append(cxlBtn);
 		subDiv.append("<br/>");
 		subDiv.append("<div class='msgBar' style='color:#ff0000;' />");
 		userInput.append(subDiv);
 		
 		// SKS-E
 		
 		var frame = $("<li id='" + data["id"] + "'</li>");
       	frame.append(photo);
       	
       	// SKS-S
       	
       	frame.append(change);
       	userInput.hide();
       	frame.append(userInput);
       	
       	// SKS-E
       	
 		frame.append("<div class='captions'>"+ data["name"]+ "</div>");
 		$(".gallery").append(frame);

 		photo.click(function() {
 			slidePhotos(data["id"]);
 		});

 		// SKS-S
 		
 		change.click(function() {
 			$("#" + data["id"] + " .userInput").show();
 			$("#" + data["id"] + " .userInput .tbInput").focus();
 		});
 		
 		okBtn.click(function(){
 	 		//$("#" + data["id"] + " .userInput").hide();
 			//$("#" + data["id"] + " .userInput .msgBar").html("FB page not found!");
 	 		//alert($("#" + data["id"] + " .userInput .tbInput").attr('value'));
 			
 			var fbPage = $("#" + data["id"] + " .userInput .tbInput");
 			if (fbPage.attr('value').trim() == ""){
 				fbPage.attr('value', '');
 				$("#" + data["id"] + " .userInput .msgBar").html("Don't try to be clever!");
 			}
 			else{
 				//alert("I am here");
 				var fbPagename = fbPage.attr('value');
 				FB.api(fbPagename, function(newdata){
 					//alert(newdata);
 					// check for a valid response
 			        if (newdata == "undefined" || newdata == null || !newdata || newdata.error) 
 			        {
 			        	$("#" + data["id"] + " .userInput .msgBar").html("FB page NOT found!");
 			            return;
 			        }
 			       
 			       hideUserInput(data["id"]);
 			       changePolaroid(data["id"], newdata);
 			       newdata = null;
 				});
 			}
 	 	});
 		
 		cxlBtn.click(function(){
 			hideUserInput(data["id"]);
 	 	});
 		
 		// SKS-E
 		
 		callback();
 	} 
 	
 	// SKS-S
 	
 	var hideUserInput = function(polaroidId){
 		$("#" + polaroidId + " .userInput .tbInput").attr('value', '');
		$("#" + polaroidId + " .userInput .msgBar").html("");
	 	$("#" + polaroidId + " .userInput").hide();
 	}
 	
 	var changePolaroid = function(polaroidId, newdata){
 		//alert("FB page found!");
		var newid = newdata["id"];
		var cover = newdata["cover"];
		$("#" + polaroidId + " .polaroid .pic_link img").attr('src', cover["source"]);
	 	$("#" + polaroidId + " .captions").html(newdata["name"]);
	 			
	 	fbPagesInfo[newid]  = { id:newid, name:newdata["name"], link:newdata["link"], cover:cover["source"]};
	 	getMostLikedPhotosByPageId(newid, no_of_photos_per_page);
	 			
	 	var newphoto = $("#" + polaroidId + " .polaroid");
	 	newphoto.unbind('click');
	 	newphoto.click(function() {
	 		slidePhotos(newid);
	 		});
 	}
 	
 	// SKS-E
 	
 	drawn=0;
 	for (var i=0; i < listOfFBPages.length; i++) {
 		FB.api(listOfFBPages[i], storeFBPage);
 	}
 }