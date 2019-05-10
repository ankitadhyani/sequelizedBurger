// import dependencies
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// set up necessarily middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tell server to ignore any requests being made to anything in the "public" folder
app.use(express.static("public"));

// turn on routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// set up wildcard (404) route
app.get('*', function(req, res) {
  res.json({
    status: 404,
    message: "You've come to the wrong place!"
  });
});


// Starting our Express app
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});