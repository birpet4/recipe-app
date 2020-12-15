const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.disable("etag");

const port = process.env.PORT;

app.use(
  session({
    secret: "secret",
  })
);

app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

// Load routing
require("./route/index")(app);

app.use((err, req, res, next) => {
  res.end("Something went wrong...");
  console.log(err);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
