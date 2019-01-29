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
        event.preventDefault();
        $("#search-bar").val("");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            for(var i = 0; i < topics.length; i++) {
                if(search === topics[i]) {
                    alert("Button already created.");
                    return;
                } else if (search == "") {
                    alert("Please Enter a value.");
                    return;
                }
            }
            topics.push(search)
            $("#button-div").append("<input type='button' id='button' value='" + search + "'>")

            $(":button").on("click", function () {
                if($(this).val() === "search") {
                    return;
                } else {
                    console.log("clicked")
                    var search = $(this).val()
                    console.log(search);
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + search + "'&api_key=4Hz8Dpmc2W3sUONDXdGqrh8kd1MtkWY9&limit=25";
                    $("#display-div").empty();
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        console.log(response)
                        for(var i = 0; i < 25; i++) {
                            var url = "<a id='url' href='" + response.data[i].url + "'> Click here for Original </a>";
                            var image = "<img id='created-image' src='" + response.data[i].images.fixed_width.url + "'>";
                            var rating = "<p id='rating'>" + response.data[i].rating + "</p>";
                            var div = "<div id='eachDiv'>" + image + rating + url + "</div>";
                    
                            var displayDiv = $("#display-div");
                            displayDiv.append(div);
                        }
                    })
                }
                
            })
        })
    });

    $(":button").on("click", function () {
        if($(this).val() === "search") {
            return;
        } else {
            console.log("clicked")
            var search = $(this).val()
            console.log(search);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + search + "'&api_key=4Hz8Dpmc2W3sUONDXdGqrh8kd1MtkWY9&limit=25";
            $("#display-div").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)
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