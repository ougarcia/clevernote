cleverNote.Views.noteContainerForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['note_container/form'],

  events: {
    'submit': 'handleSubmit'
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true});
        // TODO: do i need a merge: true here?
        Backbone.history.navigate(that.model.routesName + '/' + that.model.id, { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template({ item: this.model });
    this.$el.html(content);
    return this;
  }
});
