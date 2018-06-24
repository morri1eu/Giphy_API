$(document).ready(function () {

    var buttons = ["Mustang", "F-150", "Corvette", "Maserati", "Ferrari", "Lamborghini", "Tesla", "Ford", "Chevrolet", "GMC", "Mazda", "Jeep", "Wrangler", "Hummer"]



    function makeButtons() {
        $(".buttons").empty()
        for (i = 0; i < buttons.length; i++) {

            var newButtons = $("<button>")
            newButtons.text(buttons[i])
            newButtons.attr("class", "cars")
            newButtons.attr("id", buttons[i])
            $(".buttons").append(newButtons)
        }
    }
    $(".search").on("click", function (e) {
        e.preventDefault()
        if($("#searchField").val()===""){
            alert("Please enter a value into the field before clicking add button")
            return
        }else{
        buttons.push($("#searchField").val())
        $("#searchField").val("")
        makeButtons()}
    })

    function getGifs() {
        var searchTerm = $(this).attr("id")
        var searchNumber= $(".custom-select option:selected").val()
        console.log(searchTerm)
        console.log(searchNumber)
        if (searchNumber=="Choose..."){
            alert("Choose a number to search for")
            return
        }
        else {
        var keyAPI = "pBfZ7IG0L5yral7Ip7AfjJELl6FHUlGJ"
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=pBfZ7IG0L5yral7Ip7AfjJELl6FHUlGJ&q=" + searchTerm + "&limit="+ searchNumber + "&offset=0&rating=G&lang=en"


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var results = response.data
            for (i = 0; i < results.length; i++) {
                var newDiv = $("<div>")
                var newGif = $("<img>")
                var newP = $("<p>")
                var download= $("<button>")
                var favorite = $("<button>")
                favorite.text("Add to Favorites")
                favorite.attr("class", "add")

                download.text("Download this Gif")
                download.attr("class", "download")
                download.attr("target", "_blank")
                download.attr("href", results[i].images.original.url)
                newGif.attr("src", results[i].images.original_still.url)
                newGif.attr("alt", searchTerm + "Gif")
                newGif.attr("data-still-image", results[i].images.original_still.url)
                newGif.attr("data-animated-image", results[i].images.original.url)
                newGif.attr("state", "still")
                newP.text("Rating: " + results[i].rating)
                newDiv.append(newGif)
                newDiv.append(newP)
                newDiv.append(download)
                newDiv.append(favorite)
                $(".gifs").prepend(newDiv)
            }
        
        })
    }}

     function downloadImage(){
         console.log(this)
         var href= $(this).attr("href")
        console.log($("#download").attr("href"))
        window.location.href = href

     }

    function animatedStill(){
        console.log(this)
        if ($(this).attr("state")=== "still"){
            $(this).attr("src", $(this).attr("data-animated-image"))
            $(this).attr("state", "animated")
        }
        else{
            $(this).attr("src", $(this).attr("data-still-image"))
            $(this).attr("state", "still")
        }

    }
    function addFavorite(){
        console.log(this)
        var savedFavs = $(".favorites")
        
        $(".favorites").append($(this).siblings())
        console.log(savedFavs)
        $(this).hide()
        localStorage.setItem("favorites", savedFavs.innerHtml)
    }
    
    $(".favorites").append(localStorage.getItem("favorites"));

    function clearFav(){
        window.localStorage.removeItem("favorites")
        console.log(this)
        $(".favorites").empty()
    }


    makeButtons()
    $(document).on("click", ".cars", getGifs)
    $(document).on("click", "img", animatedStill)
    $(document).on("click", ".download", downloadImage)
    $(document).on("click", ".add", addFavorite)
    $(document).on("click", ".clear", clearFav)
})