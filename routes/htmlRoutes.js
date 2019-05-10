// Requiring our models
var db = require("../models");


// Routes =============================================================
module.exports = function (app) {

  
  /**********************************************************
   * GET route for getting all of the burgers info at home page
   **********************************************************/

  app.get("/", function (req, res) {

    console.log("In GET: /");

    db.Burgers.findAll({})
      .then(function (dbBurgerData) {
        res.json(dbBurgerData);
      });

  });


};