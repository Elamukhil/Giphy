 
  var topics = ["happy","sad","messi","ronalado","angry","vijay"]
  var athleteBtn;
  var athleteImage;

  function createButtons() {
  $("#athlete-btn-div").empty();

  for (var i=0; i < topics.length; i++) {
    var athleteBtn = $("<button>");
    athleteBtn.text(topics[i]);
    athleteBtn.attr("data-name", topics[i]);
    athleteBtn.addClass("btn btn-primary p-2 mr-3 mb-2 athlete-btn");
    $("#athlete-btn-div").append(athleteBtn);
  }
}

  function displayAthleteImages() {
    $("#results-div-col1").empty();
    $("#results-div-col2").empty();
    $("#results-div-col3").empty();
    $("#click-to-play-text").empty();

    var athlete = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=XY7nVVpWCMamCT4f71i9FHyGJHT08bo5&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(response) {
        console.log(response);
        var results = response.data;
        $("#click-to-play-text").append("<h4>" + "Click a gif to play. Click again to pause." + "</h4>");

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;

            //Display rating of gif.
            var p = $("<p>").text("Rating: " + rating);
            var athleteImage = $("<img>");
            athleteImage.attr("src", results[i].images.fixed_height_still.url);
            athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
            athleteImage.attr("data-animate", results[i].images.fixed_height.url);
            athleteImage.attr("data-state", "still");
            athleteImage.addClass ("img-fluid gif border border-primary");

            gifDiv.prepend(p);
     
            gifDiv.prepend(athleteImage);

            //Add the first three gifs retrieved from the GIPHY API call to the results-div-col1 column in the HTML.
            if (i >= 0 && i < 7) {
              $("#results-div-col1").append(gifDiv);
            }

            //Then, add the next four gifs retrieved from the GIPHY API call to the results-div-col2 column in the HTML.
            else if (i >= 7 && i < 14) {
              $("#results-div-col2").append(gifDiv);
            }

            //Finally, add the last three gifs retrieved from the GIPHY API call to the results-div-col3 column in the HTML.
            else {
              $("#results-div-col3").append(gifDiv);
            }
          }


        }

        //When the user clicks a gif in the search results section...
        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element.
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } 
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });
}

  //When submit/add button is clicked in the "Add your favorite athlete" section, add athlete-input from the search box to topics array.
  $("#submit-button").on("click", function(event) {

    //The following code prevents the submit/add button from trying to submit the form.
    //Using a form so that the user can press Enter to search instead of clicking the button.
    event.preventDefault();
    //Grab the input from the text box and change the value to lower case.
    var athleteInput = $("#athlete-input").val().toLowerCase();

    //Remove the athlete's name from text box after user clicks add/submit-button.
    $("#athlete-input").val("");

    //If the input from the search box is already in the topics array, alert to the user that the athlete is already available.
    if (topics.indexOf(athleteInput) > -1) {
      alert(athleteInput + " is already available.");
    }

    //If text box is empty, don't create button. Nothing should happen when user clicks Add icon.
    else if (athleteInput === "" || athleteInput === null) {
      return false;
    }

    //else if the input from the search box is not in the topics array, add athlete to topics array and create button for athlete.
    else if (topics.indexOf(athleteInput) === -1) {
    //add or push athleteInput from text box to topics array.
    topics.push(athleteInput);
    console.log(topics);
    //call createButtons, which handles the processing of topics array.
    createButtons();
    }
  });

  //Call createButtons() to display initial buttons.
  createButtons();

//Create click event for all elements with a class of athlete-btn.
$(document).on("click", ".athlete-btn", displayAthleteImages);

//This is the function to display the gif image that appears in the top right corner of site on md sized screens. 
//Image appears right below header on sm or xs screens.
function displayHeaderImage () {
    var queryURL = "https://api.giphy.com/v1/stickers/search?q=basketball&api_key=XY7nVVpWCMamCT4f71i9FHyGJHT08bo5";
    
 
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      
      .done(function(response) {
        console.log(response);
        var results = response.data

        
        var gifDiv = $("<div class='item'>");

        
        var headerImageUrl = results[3].images.fixed_height.url;

        var headerImage = $("<img>");
        headerImage.attr("id", "spinning-ball");
        headerImage.attr("src", headerImageUrl);
        headerImage.addClass ("img-fluid gif");

       
        gifDiv.append(headerImage);

        $("#main-header-image").append(gifDiv).addClass("mt-2");
      });

}

displayHeaderImage();





