/****************************************************************************
 * Javascrip that handles onClick and Submit functionality 
 ******************************************************************************/

$(document).ready(function () {


  //Call function to print all Burger data in there respective columns
  getAllBurgers();


  /****************************************************************************
   * getAllBurgers():
   * Display default list of saved burgers
   * This function grabs burgers from the database and updates the view
   *****************************************************************************/

  function getAllBurgers() {

    console.log("Inside getBurgers()");

    $.get("/api/burgers", function (data) {

      //Empty both lists before appending data to them
      $("#ready-burgers").empty();
      $("#devoured-burgers").empty();


      for (var i = 0; i < data.length; i++) {

        console.log(data[i].id + " :: " + data[i].burger_name + " :: " + data[i].devoured);

        //If burger is not "devoured" and is ready to be consumed then create a list item with burger name and button
        //to make it "devoured" if user wants
        if (!data[i].devoured) {

          console.log(data[i].burger_name + " is ready to be consumed");

          let $div = $("<div>").appendTo($("#ready-burgers"));

          let $li = $("<li>");

          $li
            .addClass("list-group-item pb-3")
            .text(data[i].burger_name)
            .appendTo($div);

          $("<button>")
            .attr("data-id", data[i].id)
            .attr("data-devoured", "true")
            .addClass("btn btn-sm bg-warning text-dark float-right update-burger")
            .text("Make Devoured   >>")
            .appendTo($li);

        }
        //List those burgers that are already "Devoured"
        else {

          console.log(data[i].burger_name + " is devoured.");

          let $div = $("<div>").appendTo($("#devoured-burgers"));

          let $li = $("<li>");

          $li
            .addClass("list-group-item pb-3 text-right")
            .text(data[i].burger_name)
            .appendTo($div);

          $("<button>")
            .attr("data-id", data[i].id)
            .attr("data-devoured", "false")
            .addClass("btn btn-sm bg-success float-left update-burger")
            .text("<<   Make Ready")
            .appendTo($li);

        }

      }
    });

  } //End of getAllBurgers()



  /****************************************************************************
   * Event listener to form submit
   *****************************************************************************/

  $("#burger-form").on("submit", function (event) {

    console.log("Burger form submit action");

    event.preventDefault();

    // package up form data for req.body purposes
    const burgerData = {
      burger_name: $("#name-input").val().trim()
    }

    $.ajax({
        url: "/api/burgers",
        method: "POST",
        data: burgerData // req.body
      })
      .then(function () {
        // reload the page
        location.reload();
      })
      .catch(err => console.log(err));

  });


  
  /*****************************************************************************
   * Event listener to update burger data for ready & devoured burgers
   *****************************************************************************/

  $("#ready-burgers").on("click", ".update-burger", updateBurgerData);

  $("#devoured-burgers").on("click", ".update-burger", updateBurgerData);



  /****************************************************************************
   * updateBurgerData()
   * This function performs the common functionality to make a 
   * burger Ready or Devoured
   *****************************************************************************/

  function updateBurgerData() {

    console.log("Update Burger onClick performed on ready burgers");

    // read back burger's id and devoured status
    const burgerId = $(this).attr("data-id");
    const devoured = $(this).attr("data-devoured")

    console.log("burgerId: " + burgerId + " || " + "devoured: " + devoured);

    $.ajax({
        url: `/api/burgers/${burgerId}`,
        method: "PUT",
        data: {
          devoured: devoured
        } // req.body
      })
      .then(function () {
        console.log("In .then of PUT /api/burgers/" + burgerId);
        getAllBurgers();
      });

  } //End of updateBurgerData()


  
  /****************************************************************************
   * Event listener to delete burger data from db
   *****************************************************************************/

  $(".delete-burger").on("click", function () {

    console.log("Delete Burger onClick performed");

    // get burger's id
    const burgerId = $(this).attr("data-id");

    $.ajax({
        url: `/api/burgers/${burgerId}`,
        method: "DELETE"
      })
      .then(() => location.reload())
      .catch(err => console.log(err));
  });

});