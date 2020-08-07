const express = require('express');
const { fstat } = require('fs');
const { listenerCount } = require('process');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// /// api / json
// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf-8', (err,data) => {
//     if (err) {
//       console.log('Sorry! We could not read your note.');
//     }
//     db = JSON.parse(data);
//     res.json(db);
//   });
// });




const listener = app.listen(PORT, (req, res) => {
  console.log('Currently running on port: ' +listener.address().port);
});