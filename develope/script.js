
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

        // clears previously displayed 5-day forecast
        // gets weather icon and append to page
        $(".card-deck").empty();
        var icon = dataFromFirstAPI.weather[0].icon;
        var iconImg = $("<img>");
        iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
        $("#city").append(iconImg);
        // populates html ID's with the current weather data
        $("#temp").text("Temperature: " + (Math.round(((dataFromFirstAPI.main.temp - 273.15)*1.8)+32)) + "° F");
        $("#humidity").text("Humidity: " + dataFromFirstAPI.main.humidity + "%");
        $("#wind-speed").text("Wind: " + dataFromFirstAPI.wind.speed + "mph");

        // getWeatherApi (lat,lon)
    });
};

// function getWeatherApi(lat,lon){
//     var apiKey ="18498ae985b8d6f193252af6f0bb056e"
//     var requestUrl2 = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=5&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial";

//     $.ajax({
//         url: requestUrl2,
//         method: "GET",
//     }).then(function(response){
//         console.log(response);
//      
// };



function searchBtn() {
    var userInput = $("input").val().trim();
    //buttons created dynamically as the user enters cities 
    var cityList = $("<button>");
    cityList.addClass(".previously-searched");
    cityList.text(userInput);
    // buttons are added to the list in the sidebar
    $(".previously-searched").prepend(cityList);
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
$(".previously-searched").on("click", "button", function () {
    cityName = $(this).text();
    console.log(cityName);

    getLatAndLon(cityName);
})