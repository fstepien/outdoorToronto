
class Storage {
  constructor () {
    this.lat;
    this.lng;
    this.defaultLat = 43.653226,
    this.defaultLng = -79.383184
  }

  getLocationData() {
    if(localStorage.getItem('lat') === null){
        this.lat = this.defaultLat;
    } else {
        this.lat = parseFloat(localStorage.getItem('lat'));
    }
    if(localStorage.getItem('lng') === null){
      this.lng = this.defaultLng;
  } else {
      this.lng = parseFloat(localStorage.getItem('lng'));
  }
  return {
    lng: this.lng, 
    lat: this.lat
  }
  }

  setLocationDat(lat,lng){
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
  }
}
