let noteDb = require('../db/db.json');
const fs = require('fs');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(noteDb);
  });

  app.post('/api/notes', (req, res) => {
    let addNote = req.body;
    addNote.id = Date.now();
    noteDb.push(addNote);
    fs.writeFile(
      __dirname + '/../db/db.json',
      JSON.stringify(noteDb),
      (err) => {
        if (err) {
          throw err;
        } else {
          res.json(addNote);
        }
      }
    );
  });

  app.delete('/api/notes/:id', (req, res) => {
    let deleteNote = req.params.id;
    noteDb = noteDb.filter(
      (note) => parseInt(note.id) !== parseInt(deleteNote)
    );
    fs.writeFile(
      __dirname + '/../db/db.json',
      JSON.stringify(noteDb),
      (err) => {
        if (err) throw err;
        else {
          res.json(deleteNote);
        }
      }
    );
  });
};
