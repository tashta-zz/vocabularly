var TestView = Backbone.View.extend({

	className: 'testBox',

  initialize: function(){
  	this.collection.on('change', this.render, this);
  	this.coLen = this.collection.length;
  },

  render: function(){
  	this.$el.html('');
    var variants = this.chooseWords();
  	var subviews = variants.map(function(word){
      return new TestEntryView( {model : word} );
    });
		return this.$el.append(
      _(subviews).map(function(subview){
        return subview.render();
      })
    );
  },

  chooseWords: function(){
    var indexes = [];
    var variants = [];
    var ind1 = Math.floor( Math.random() * this.coLen );
    indexes.push(ind1);
    var var1 = this.collection.at(ind1);
    var1.set('right', true, {silent: true});
    this.$el.append('<div class="pracWord">' + var1.get('word') + '</div>')
    variants.push(var1);
    while (variants.length < 4){
      var ind = Math.floor(Math.random()*this.coLen);
      if ( !_.contains(indexes, ind) ){
        indexes.push(ind);
        var vari = this.collection.at(ind);
        variants.push(vari);
      }
    }
    return _.shuffle(variants);
  }

});