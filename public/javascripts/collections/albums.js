define([
  'jquery',
  'underscore',
  'backbone',
  'models/album'
], function($, _, Backbone, albumModel){
  var albumsCollection = Backbone.Collection.extend({
    model: albumModel,
    initialize: function(){
    }

  });
  return new albumsCollection;
});
