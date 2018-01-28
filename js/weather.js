class Weather{
  constructor(lat, lng)
{
  this.apiKey = '848e77420fa268a0881f4d57fd14cc77';
  this.lat = lat;
  this.lng = lng;
  
}
async getWeather(){

  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lng}&appid=${this.apiKey}`);
   return response;
}
changeLocation(city,state){
  this.city = city;
  this.state = state;
}
}
class WeatherBox{
  //Get time    
paint(results){
  
for (let i = 0; i < 3; i++){
let unix = results.list[i].dt;
var date= new Date(unix*1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//Get Temp
let tempC = Number(results.list[i].main.temp - 272.15).toFixed(1);
//Get Wind
let knots = Number(results.list[i].wind.speed *1.9438).toFixed(1);
//Get Wind
let wind = results.list[i].wind.deg;
//Weather Description
let conditions = results.list[i].weather[i].description;
//Get Weather Icon ID
let icon = results.list[i].weather[i].icon;

let weatherInfo = {
icon: icon,
time: time,
conditions: conditions,
wind: wind,
knots: knots,
tempC: tempC
};

return weatherInfo;
}
}}