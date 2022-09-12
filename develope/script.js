
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
    var requestUrl2 = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=18498ae985b8d6f193252af6f0bb056e&units=imperial";

    $.ajax({
        url: requestUrl2,
        method: "GET",
    }).then(function(response){
        console.log(response);
        // clears previously displayed 5-day forecast
        $(".card-deck").empty();
        // gets weather icon and append to page
        $(".card-deck").empty();
        var icon = response.current.weather[0].icon;
        var iconImg = $("<img>");
        iconImg.attr("src","https://openweathermap.org/img/wn/" + icon + "@2x.png")
        $("#city").append(iconImg);
        // populates html ID's with the current weather data
        $("#temp").text("Temperature: " + response.current.temp + "° F");
        $("#humidity").text("Humidity: " + response.current.humidity + "%");
        $("#wind").text("Wind: " + response.current.wind_speed + "mph");
        // displays the html to user
        $(".current-data").css({"display":"block"});
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

$("#city-form").submit(function (event) {
    event.preventDefault();
    searchBtn();
});