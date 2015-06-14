cleverNote.Views.notesContainerIndexItem = Backbone.View.extend({
  tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ item: this.model });
    this.$el.html(content);
    return this;
  }
});
