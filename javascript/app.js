function game () {
    var topics = ["ocean", "blowfish", "lighthouse", "sea", "waves", "whale", "vast", "beach", "water", "shark", "tidal","random"];
    

    // take each topic and display on to html as a placeholder & example
    for (var i = 0; i < topics.length; i++) {
        var button = $("<input type='button' id='button' value='" + topics[i]+ "'>");
        var buttonDiv = $("#button-div");
        buttonDiv.append(button);

    }; 

    // on search button click, run ajax call 
    $("#search-button").on("click", (event) => {
        var search = $("#search-bar").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + search + "'&api_key=4Hz8Dpmc2W3sUONDXdGqrh8kd1MtkWY9&limit=25";
        console.log(queryURL, search);
        // prevent browser refresh on click
        event.preventDefault();
        $("#search-bar").val("");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            // loop through topics array and see if topic has already been created as button
            for(var i = 0; i < topics.length; i++) {
                if(search === topics[i]) {
                    alert("Button already created.");
                    return;
                // check if input field is empty
                } else if (search == "") {
                    alert("Please Enter a value.");
                    return;
                }
            }
            // push search into topics array
            topics.push(search)
            // populate html with button created
            $("#button-div").append("<input type='button' id='button' value='" + search + "'>")
            
            // on click any button
            $(":button").on("click", function () {
                // makes sure search button is excluded (making sure it doesnt search and create button at the same time)
                if($(this).val() === "search") {
                    return;
                } else {
                    var search = $(this).val()
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + search + "'&api_key=4Hz8Dpmc2W3sUONDXdGqrh8kd1MtkWY9&limit=25";
                    $("#display-div").empty();
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        // loop through api object and populate wanted html elements
                        for(var i = 0; i < 25; i++) {
                            var url = "<a id='url' href='" + response.data[i].url + "'> Click here for Original </a>";
                            var image = "<img id='created-image' src='" + response.data[i].images.fixed_width.url + "'>";
                            var rating = "<p id='rating'>" + response.data[i].rating + "</p>";
                            var div = "<div id='eachDiv'>" + image + rating + url + "</div>";
                            
                            // display onto the page
                            var displayDiv = $("#display-div");
                            displayDiv.append(div);
                        }
                    })
                }
                
            })
        })
    });

    // for every other button click except when search button was clicked
    $(":button").on("click", function () {
        if($(this).val() === "search") {
            return;
        } else {
            var search = $(this).val()
            var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + search + "'&api_key=4Hz8Dpmc2W3sUONDXdGqrh8kd1MtkWY9&limit=25";
            $("#display-div").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                for(var i = 0; i < 25; i++) {
                    var url = "<a id='url' href='" + response.data[i].url + "'> Click here for Original </a>";
                    var image = "<img id='created-image' src='" + response.data[i].images.fixed_width.url + "'>";
                    var rating = "<p id='rating'>Rating: " + response.data[i].rating + "</p>";
                    var div = "<div id='eachDiv'>" + image + rating + url + "</div>";
            
                    var displayDiv = $("#display-div");
                    displayDiv.append(div);
                }
            })
        }
        
    })
}



game();