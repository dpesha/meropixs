// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.8.1',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    facebooklib: '//connect.facebook.net/en_US/all',
    jqueryeasing: 'libs/jquery.easing.min',
    supersized: 'libs/supersized.3.2.7',
    supersizedshutter: '../theme/supersized.shutter',
    touchevent :'../touchevent',
    hammer: 'libs/hammer',
    specialeventhammer: 'libs/jquery.specialevent.hammer',
    touchevent: 'touchevent',    	
    text: 'libs/require/text',
    templates: '../templates',
    meropixs: 'libs/common/meropixs',
    jqueryeffectscore  : 'libs/jquery/jquery.effects.core',
    jqueryeffectsslide : 'libs/jquery/jquery.effects.slide'    	
  },
  
  shim: {
	  jqueryeasing: {
		  deps: ["jquery"],
		  exports: 'jqueryeasing'
	  },	  
	  supersized: {
		  deps: ["jquery", "jqueryeasing"],
		  exports: 'supersized'
	  },
	  supersizedshutter: {
		  deps: ["jquery", "jqueryeasing", "supersized"],
		  exports: 'supersizedshutter'
	  },  
    jqueryeffectscore: {
      deps: ["jquery"]
    },
    jqueryeffectsslide: {
      deps: ["jquery", "jqueryeffectscore"]
    }
  }

});

require([

  // Load our app module and pass it to our definition function
  'app'

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});