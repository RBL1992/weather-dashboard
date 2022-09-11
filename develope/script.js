var userInput = "chicago";
var apiKey = "18498ae985b8d6f193252af6f0bb056e"
var requestUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey
var requestUrl2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

var lat = "";
var lon = "";

function getWeather() {
    // first api call to get the lat and lon
    $.ajax({
        url: requestUrl1,
        method: 'GET',
    }).then(function (response) {
        console.log('AJAX Response \n-------------');
        console.log(response);
        lat = response.coord.lat;
        lon = response.coord.lon;

        $("#city").text(response.name);
        $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));

        localStorage.setItem("cityname", response.name);

        // getWeatherApi(lat,lon);

    });
};

// function getWeatherApi(lat,lon){

//     $.ajax({
//         url: requestUrl2,
//         method: "GET",
//     }).then(function(response){
//         console.log(response);
//     })
// };

function searchBtn() {
    userInput = $("input").val().trim();
    //buttons created dynamically as the user enters cities 
    var cityList = $("<button>");
    cityList.addClass("previously-searched");
    cityList.text(userInput);
    // buttons are added to the list in the sidebar
    $("ul").prepend(cityList);
    // after the user city is saved the input field is cleared
    $("input").val("");

    getWeather();
};

$("#city-form").submit(function (event) {
    event.preventDefault();
    searchBtn();
});