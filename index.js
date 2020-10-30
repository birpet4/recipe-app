const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
  res.end('Something went wrong...');
  console.log(err);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
