
$(document).ready(function() {

	// initial array values used to write on gif buttons
	// more values will be pushed into this array
	var topic = ["london", "new york", "bucharest", "tokyo", "buenos aires", "chicago", "new york"];
	// when clicking the movie class( in my case, the buttons in the dump-buttons div), the displayGif function will run
	$(document).on("click", ".movie", displayGif);
	// click to animate a still gif, then click again to pause it
	$(document).on("click", ".gif", startPause);

	// function will display the info in html
	function displayGif () {

		var gif = $(this).attr("data-name")
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif +"&api_key=ee8204d29d2240a996a11927f04a8e1a&limit=10";

		// empty the gifs before displaying, at the press of the button, new gifs and their ratings
		$("#dump-gifs").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			var results = response.data

			for (var i = 0; i < results.length; i++ ) {

				console.log(results);
				console.log(queryURL);

				var gifDiv = $("<div>").addClass("gifs")

				var rating = results[i].rating;

				var showR = $("<p>").text("Rating: " + rating);

				gifDiv.append(showR);

				var movieGif = results[i].images

				var imageURL = $("<img>");

				imageURL.addClass("gif")
				imageURL.attr("src", movieGif.fixed_height_still.url);
				imageURL.attr("data-still", movieGif.fixed_height_still.url);
				imageURL.attr("data-animate", movieGif.fixed_height.url);
				imageURL.attr("data-state", "still")
				
				gifDiv.append(imageURL);

				$("#dump-gifs").append(gifDiv);

			} // END for-loop END //

		}); // END response END //
 
	} // END displayGifs END //

	// use function to animate a still gif and pause an animated gif
	function startPause () {

		var state = $(this).attr("data-state");

		// if we click on the gif and it's paused (still), then animate it
		if (state === "still") {
			// the image's source will now be the data-animate url
			// the image's data-state will now animate
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate")
		}
		// if the gif is animated, the click will pause it
		else {
			// the image's source will now be the data-still url
			// the image's data-state will now be still
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "animate");
		}	
		
	} // END gif on click END //

	// when calling this function, buttons will be created from all the array elements
	function renderButtons() {

		// anytime we call on this function, we also delete everything in the dump-buttons div
		// this is necessary, otherwise we'd have repeat buttons
		$("#dump-buttons").empty();
		
		for (var i = 0; i < topic.length; i++) {

			var movieBtn = $("<button>");

			movieBtn.addClass("movie");
			movieBtn.attr("data-name", topic[i]);
			movieBtn.text(topic[i]);

			$("#dump-buttons").append(movieBtn);

		} // END for-loop END //

	} // END renderButtons END // 

	renderButtons();	

	// clicking on the add a movie button will...
	// 1) prevent the button from submitting a form (unclear as to what this means)
	// 2) take the text's value input and trim the white spaces, then declare var movie with the trimed value
	// 3) push the variable into the topic array
	// 4) render the newly added button in the dump-buttons div
	$("#add-button").on("click", function(event) {

		event.preventDefault();

		var places = $("#choose-movie").val().trim();

		topic.push(places);

		renderButtons();

	}); // END add-button END //

}); // END .ready END //