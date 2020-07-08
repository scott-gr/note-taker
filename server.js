const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view / html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
/// api / json

app.listen(PORT, (req, res) => {
  console.log('currently running on http://localhost:${PORT}');
});