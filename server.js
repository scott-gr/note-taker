const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);



const listener = app.listen(PORT, (req, res) => {
  console.log('Currently running on port: ' +listener.address().port);
});