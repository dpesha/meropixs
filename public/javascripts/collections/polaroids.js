define([
  'jquery',
  'underscore',
  'backbone',
  'models/polaroid'
], function($, _, Backbone, polaroidModel){
  var polaroidsCollection = Backbone.Collection.extend({
    model: polaroidModel,
    initialize: function(){
    }

  });
  return new polaroidsCollection;
});
