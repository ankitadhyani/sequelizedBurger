
// Requiring our models
var db = require("../models");


// Routes 
module.exports = function (app) {

    
    /**********************************************************
     * GET route for getting all of the burgers
     **********************************************************/
     
    app.get("/api/burgers", function (req, res) {

        console.log("In GET: /api/burgers");

        db.Burgers.findAll({}).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });

    /**********************************************************
     * POST route for saving a new burger
     **********************************************************/
     
    app.post("/api/burgers", function (req, res) {

        console.log("In POST: /api/burgers");

        db.Burgers.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function (dbBurger) {
            res.json(dbBurger);
        })

    });


     /**********************************************************
     * PUT route for updating burger
     * Update a burger's 'devoured' to true/false by id
     **********************************************************/
 
    app.put("/api/burgers/:id", function (req, res) {

        console.log("In PUT: /api/burgers/" + req.params.id);

        db.Burgers.update({
                devoured: req.body.devoured
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBurger) {
                res.json(dbBurger);
            });

    });


     /**********************************************************
     * DELETE a burger by its id
     **********************************************************/
     
    app.delete("/api/burgers/:id", function (req, res) {

        console.log("In DELETE: /api/burgers/" + req.params.id);

        db.Burgers.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbBurger => res.json(dbBurger))
            .catch(err => {
                console.log(dbBurger);
                res.json(dbBurger);
            });

    });

};