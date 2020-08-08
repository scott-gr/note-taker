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

const handleNewView = function () {
  currentNote = {};
  renderCurrentNote();
};

//if title or text are empty, hide save button
const handleSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

//renders list of note titles
const renderNoteList = (notes) => {
  $noteList.empty();

  const noteListItems = [];

  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li("You have no saved notes.", false));
  }

  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });

  $noteList.append(noteListItems);
};

//render notes to sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

//on click events for buttons
$saveNoteBtn.on("click", handleSave);
$noteList.on("click", ".list-group-item", handleView);
$newNoteBtn.on("click", handleNewView);
$noteList.on("click", ".delete-note", handleDelete);
$noteTitle.on("keyup", handleSaveBtn);
$noteText.on("keyup", handleSaveBtn);

// Gets and renders notes on load
getAndRenderNotes();