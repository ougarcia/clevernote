cleverNote.Views.NoteForm = Backbone.CompositeView.extend({
  className: 'row',
  template: JST['notes/form'],

  events: {
    'click .submit': 'handleSubmit'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.notebook = this.notebooks.getOrFetch(
      options.notebookId,
      this.setModel.bind(this, options)
    );
    this.notebooks.fetch();
    this.tags.fetch();
  },
  
  setModel: function (options) {
    this.model = options.note || this.notebook.notes().get(options.noteId);
    this.tagIds = this.model.tags().map( function(tag) {
      return tag.id;
    });
    this.addTagsSubview();
    this.addNotebooksSubview();
    this.addNoteBodySubview();
    this.render();
  },

  addNotebooksSubview: function () {
    var subview = new cleverNote.Views.NoteFormNotebooks({
      collection: this.notebooks,
      model: this.notebook
    });
    this.addSubview('#notebooks-form', subview);
  },

  addTagsSubview: function () {
    this.tagsSubview = new cleverNote.Views.NoteFormTags({
      collection: this.tags,
      tagIds: this.tagIds,
      model: this.model
    });
    this.addSubview('#tags-form', this.tagsSubview);
  },

  addNoteBodySubview: function () {
    this.noteBodySubview = new cleverNote.Views.NoteFormBody({ model: this.model });
    this.addSubview('#note-body-form', this.noteBodySubview);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    attrs['note']['body'] = this.noteBodySubview._editor.getHTML();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.submitSuccess();
      }
    });
  },

  submitSuccess: function () {
    if ( (this.model.get('notebook_id') !== this.notebook.id) ) {
      this.notebook.notes().remove(this.note);
      this.notebook = this.notebooks.getOrFetch(this.model.get('notebook_id'));
    }
    this.notebook.notes().add(this.model);
    Backbone.history.navigate(
      'notebooks/' + this.notebook.id,
      { trigger: true }
    );
  },

  render: function () {
    if (this.model) {
      var content = this.template({ note: this.model });
      this.$el.html(content);
      this.attachSubviews();
      this.noteBodySubview.onRender();
      this.tagsSubview.onRender();
      // setTimeout(this.tagsSubview.onRender.bind(this.tagsSubview), 0);
    }
    return this;
  }
});
