define([
        'jquery',
        'underscore',
        'backbone',
        'meropixs',
        'javascripts/libs/facebook/facebook.js',
        'text!templates/login.html',
], function($, _, Backbone, MeroPixs, fbApi, loginTemplate) {

	var loginView = Backbone.View.extend({
		el: $("#login"),

		initialize: function() {
			
		},	

		events : {
			"click .fblogin" : "fblogin"		
		},

		fblogin : function(ev){
			ev.preventDefault();
			this.openOAuthPopup('/auth/facebook',this.render);
		},

		render: function() {

			var self=this;
			$.getJSON('/fblogin', function(user) {
				if(user){
					var html='<p> Hello, ' + user.name + ', <a href="/logout">Logout</a></p>';
					self.el.html(html);
					MeroPixs.loggedInUser=user;	
				} else {
					var compiledTemplate = _.template(loginTemplate, {});
					self.el.html(compiledTemplate);	
				}							
        	});  
		},

		openOAuthPopup: function (url,callback){
			var popupWindow = this.popupwindow(url, "popupWindow", 500, 250);
			var self=this;
			var timer = setInterval(function() {   
			    if(popupWindow.closed) 
			    {  
			    	clearTimeout(timer);
			    	callback.apply(self);
			    }  
			}, 1000);
		},

		popupwindow: function (url, title, w, h) {
			var left = (screen.width/2)-(w/2);
			var top = (screen.height/2)-(h/2);
			return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
		},

		fbAuthCallback: function () {
			var self=this;
			$.getJSON('/fblogin', function(user) {
				var html='<p> Hello, ' + user.name + ', <a href="/logout">Logout</a></p>';
				self.el.html(html);
				MeroPixs.loggedInUser=user;				
        	});        
		},		
		
	});
	return new loginView;
});
