var DictionaryEntryView = Backbone.View.extend({

	tagName: 'tr',

  template: _.template(
    '<td class="dictWord"><%= word %><span class="speaker">&#128265;</span></td>\
      <td class="dictTrans"><%= translation %></td>\
      <td class="delete">/delete/</td>'
  ),

  events: {
  	'click .delete' : 'delete'
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  delete: function(){
  	deleteWord(this.model.get('word'), function(){
  		location.reload();
  	});
  }

});