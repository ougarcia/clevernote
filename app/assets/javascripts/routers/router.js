cleverNote.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'startPage',
    'notebooks': 'notebooksIndex',
    'notebooks/new': 'newNotebook',
    'notebooks/:id': 'showNotebook'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.$rootEl = options.$rootEl;
  },

  startPage: function () {
    Backbone.history.navigate('notebooks', { trigger: true } );
  },

  notebooksIndex: function () {
    this.notebooks.fetch();
    var view = new cleverNote.Views.NotebooksIndex({
      collection: this.notebooks
    });
    this._swapView(view);
  },

  newNotebook: function () {
    var notebook = new cleverNote.Models.Notebook();
    var view = new cleverNote.Views.NewNotebook({
      model: notebook,
      collection: this.notebooks
    });
    this._swapView(view);
  },

  showNotebook: function (id) {
    console.log('in show');
    var notebook = this.notebooks.getOrFetch(id);
    var view = new cleverNote.Views.ShowNotebook({ model: notebook });
    this._swapView(view);
  },  


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
