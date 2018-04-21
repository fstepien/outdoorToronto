class Weather {
  constructor(lat, lng) {
    this.apiKey = "848e77420fa268a0881f4d57fd14cc77";
    this.lat = lat;
    this.lng = lng;
  }
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${
        this.lng
      }&appid=${this.apiKey}`
    );
    return response;
  }
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
class WeatherBox {
  //Get time
  paint(results) {
    let output = "";
    let weatherData;
    for (let i = 0; i < 4; i++) {
      let unix = results.list[i].dt;
      var date = new Date(unix * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var time = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      let tempC = Number(results.list[i].main.temp - 272.15).toFixed(1);
      //Get Wind
      let knots = Number(results.list[i].wind.speed * 1.9438).toFixed(1);
      //Get Wind
      let wind = results.list[i].wind.deg;
      //Weather Description
      let conditions = results.list[i].weather[0].description;
      //Get Weather Icon ID
      let icon = results.list[i].weather[0].icon;
      output += `
            <div id="weather-one" class="weather-box">
            <h5>${time}</h5>
            <div class="icons-info">
            <div class="icons">  
            <img src="https://openweathermap.org/img/w/${icon}.png"><i class="material-icons medium" style="transform: rotate(${wind}deg)">arrow_downward</i></div>
            <ul>
            <li><span class="condition">${conditions}</span></li>
            <li>Temperature: ${tempC}°C</li>
            <li>Wind Speed: ${knots} knots</li>
            </ul>
            </div>
            </div>`;

      weatherData = `<div class="weather-container">${output}</div>`;
    }
    return weatherData;
  }
  //End of Paint
}
//End of WEatherBox
