// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'meropixs',
  'views/polaroid',
  'views/slideshow'
], function($, _, Backbone, MeroPixs, polaroidView, slideshowView ){
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
      MeroPixs.showView(slideshowView, {id:id});
    },
    defaultAction: function(actions){
      // We have no matching route, lets display the home page
      MeroPixs.showView(polaroidView);
      //polaroidView.render();
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
