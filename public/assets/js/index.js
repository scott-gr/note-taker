const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

//title, text, save btn, new btn, list

//track note that is currently being added
let currentNote = {}

//get notes from db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

//save note to db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

//delete note from db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};
// display the active note, otherwise fields stay empty
const renderCurrentNote = () => {
  $saveNoteBtn.hide();

  if (currentNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};
//save input to db and update view
const handleSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderCurrentNote();
  });
};

// delete clicked note
const handleDelete = function (event) {

  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();
  if (currentNote.id === note.id) {
    currentNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderCurrentNote();
  });
};

// Sets and displays currentNote
const handleView = function () {
  currentNote = $(this).data();
  renderCurrentNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewView = function () {
  currentNote = {};
  renderCurrentNote();
};