var userInput ="chicago";
var apiKey="18498ae985b8d6f193252af6f0bb056e"
var requestUrl1="https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid="+ apiKey

var lat="";
var lon="";

function getWeather(){
// first api call to get the lat and lon
$.ajax({
    url: requestUrl1,
    method: 'GET',
  }).then(function (response) {
    console.log('AJAX Response \n-------------');
    console.log(response);
    lat= response.coord.lat;
    lon= response.coord.lon;

    $("#city").text(response.name);
    $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));

    localStorage.setItem("cityname", response.name);
   
  });

}getWeather();