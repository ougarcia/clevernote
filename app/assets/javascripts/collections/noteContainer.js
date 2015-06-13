cleverNote.Collections.noteContainer = {

  getOrFetch: function(id, cb) {
    // might crash if already in collection and you don't pass a
    // callback
    var that = this;
    var notebook;
    if ( !(notebook = this.get(id)) ) {
      notebook = new cleverNote.Models.Notebook({ id: id });
      notebook.fetch({
        success: function () {
          that.add(notebook);
          if (cb) {
            cb(notebook);
          }
        }
      });
    } else {
      notebook.fetch({
        success: cb
      });
    }

    return notebook;
  }
};
