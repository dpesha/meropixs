define([
  'jquery',
  'underscore',
  'backbone',
  'models/photo'
], function($, _, Backbone, photoModel){
  var selectedPhotosCollection = Backbone.Collection.extend({
    model: photoModel,
    initialize: function(){
    }

  });
  return new selectedPhotosCollection;
});