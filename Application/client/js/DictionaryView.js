var DictionaryView = Backbone.View.extend({

	tagName: "table",

  className: 'allWords',

  initialize: function(){
    this.subviews = this.collection.map(function(word){
      return new DictionaryEntryView({model: word});
    });
  },

  render: function(){
    return this.$el.append(
      _(this.subviews).map(function(subview){
        return subview.render();
      })
    );
  }

});