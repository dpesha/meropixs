define([
  'jquery',
  'underscore',
  'backbone',
  'models/home/photo'
], function($, _, Backbone, photoModel){
  var photosCollection = Backbone.Collection.extend({
    model: photoModel,
    initialize: function(){
    }

  });
  return new photosCollection;
});
