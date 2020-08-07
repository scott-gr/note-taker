

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
const postNote = (note) => {
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