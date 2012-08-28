// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/polaroid',
  'views/home/slideshow'
], function($, _, Backbone, polaroidView, slideshowView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'slideshow/:id': 'slideShow',
      // Default
      '*actions': 'defaultAction'
    },
    slideShow: function(id){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      slideshowView.render(id);
    },
    defaultAction: function(actions){
      // We have no matching route, lets display the home page
      polaroidView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
