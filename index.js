const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("static"));

// Load routing
require('./route/index')(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
