
function getLatAndLon(userCity) {
    var apiKey = "18498ae985b8d6f193252af6f0bb056e"
    var requestUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey
    console.log('req url 1', requestUrl1)
    // first api call to get the lat and lon
    $.ajax({
        url: requestUrl1,
        method: 'GET',
    }).then(function (dataFromFirstAPI) {

        console.log('AJAX dataFromFirstAPI \n-------------');
        console.log(dataFromFirstAPI);
        var lat = dataFromFirstAPI.coord.lat;
        var lon = dataFromFirstAPI.coord.lon;
        
        $("#city").text(dataFromFirstAPI.name);
        $("#date").text(moment.unix(dataFromFirstAPI.dt).format("dddd, MM/DD/YYYY"));
        
        localStorage.setItem("cityname", dataFromFirstAPI.name);
        
        getWeatherApi(lat,lon);
        
    });
};

function getWeatherApi(lat,lon){
    var apiKey ="18498ae985b8d6f193252af6f0bb056e"
    var requestUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: requestUrl2,
        method: "GET",
    }).then(function(response){
        console.log(response);
        // clears previously displayed 5-day forecast
        $(".card-deck").empty();
        // gets weather icon and append to page
        $(".card-deck").empty();
        var icon = response.weather[0].icon;
        var iconImg = $("<img>");
        iconImg.attr("src","https://openweathermap.org/img/wn/" + icon + "@2x.png")
        $("#city").append(iconImg);
        // populates html ID's with the current weather data
        $("#temp").text("Temperature: " + response.main.temp + "° F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + response.wind[0] + "mph");
        // displays the html to user
        $(".future-data").css({"display":"block"});
    })
};

function searchBtn() {
    var userInput = $("input").val().trim();
    //buttons created dynamically as the user enters cities 
    var cityList = $("<button>");
    cityList.addClass("previously-searched");
    cityList.text(userInput);
    // buttons are added to the list in the sidebar
    $("ul").prepend(cityList);
    // after the user city is saved the input field is cleared
    $("input").val("");

    getLatAndLon(userInput);
};
// submit event for when user inputs city in search box
$("#city-form").submit(function (event) {
    event.preventDefault();
    searchBtn();
});

//click event listener for when the user clicks on a city in the history list
$("ul").on("click", "button", function () {
    cityName = $(this).text();
    console.log(cityName);

    getLatAndLon();
})