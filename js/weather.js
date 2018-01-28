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
