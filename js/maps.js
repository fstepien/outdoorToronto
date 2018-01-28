let map;
// let myLatLng = { lat: 43.653226, lng: -79.383184 }
const storage = new Storage();
let myLatLng = storage.getLocationData();
const weatherBox = new WeatherBox();

  

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8,
    styles: [
      {
        elementType: 'geometry',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#bdbdbd'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#dadada'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#c9c9c9'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      }
    ]
  });
  // ****************HOME MARKER/WINDOW**************
  var homeWindow = new google.maps.InfoWindow({
    content: "<form id=\"newlocation\"><input id=\"new-home-input\" placeholder=\"change your location\"></input><button class=\"btn grey\" id=\"new-home-btn\" type=\"submit\"><i class=\"material-icons\">home</i></button><form>"
  });
  var home = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "home",
    icon:"assets/home.png",
    
  });

  var geocoder = new google.maps.Geocoder();

  home.addListener('click', function () {
    homeWindow.open(map, home);
    // update location 
    document.querySelector('#new-home-btn').addEventListener('click', (e) => {
    e.preventDefault();  
    geocodeAddress(geocoder);
    
    
  });


  });
  /*******************geocode address within submit************************ */
  function geocodeAddress(geocoder) {
    let newAddress = document.querySelector('#new-home-input').value;
    
    geocoder.geocode({'address': newAddress}, function(results, status) {
      if (status === 'OK') {
        let homeLat = results[0].geometry.location.lat();
        let homeLng = results[0].geometry.location.lng();
        console.log("Current home coordinates: " + homeLat + "," + homeLng);
        storage.setLocationDat(homeLat,homeLng);
        location.reload();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


 // ****************END HOME MARKER/WINDOW**************
fetch('js/locations.json')
.then(res => res.json())
.then((data) => {
  markersData = data;
  //Start of marker for loop 
  for (var i = 0; i < markersData.length; i++) {
   
//GET DISTANCE to Marker Location
  let origin = new google.maps.LatLng(myLatLng.lat, myLatLng.lng);
  let destination = new google.maps.LatLng(markersData[i].coords.lat,markersData[i].coords.lng);


   //GET WEATHER for Marker Location
   const weather = new Weather(markersData[i].coords.lat, markersData[i].coords.lng);
   let currentMarker = markersData[i];
    weather.getWeather()
          .then(data => data.json())
          .then(results => {

            let weatherInfo = weatherBox.paint(results);
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
              {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING'
              }, callback);

            
            function callback(response, status) {
                  if (status == 'OK') {
                    let distance = response.rows[0].elements[0].distance.text;
                    let duration = response.rows[0].elements[0].duration.text;
                  
                    addMarker(currentMarker, distance, duration, weatherInfo);
                    
                  }
                }
            
          })
   .catch(err => console.log(err)); 
  

  }
  //End of marker for loop 
})
.catch((err) => {console.log(`Sorry, ${err}. Go to http://www.escapetorontonow.com/ for weekend ideas`)});

function addMarker(properties, distance, duration, weatherInfo) {

    let marker = new google.maps.Marker({
      position: properties.coords,
      map: map,
      title: `${properties.content.location}`,

    });

    //Set outside to prevent undefined properties in marker
    if (properties.iconImage) {
      marker.setIcon(properties.iconImage);
    }
    console.log(weatherInfo);
    if (properties.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="row">
            <div class="col s12 m12 location-info">
              
                
                  
            <h4 class=title">${properties.content.location}</h4>
            <p><strong>Activities:</strong> ${properties.activities.a1} ${properties.activities.a2} ${properties.activities.a3} ${properties.activities.a4}</p>
            <p><i class="material-icons">directions_car</i> Only ${distance} away, you can be here in ${duration}</p>
            <a class="btn-floating right waves-effect waves-light grey launch-modal" ${properties.content.modalNone}><i class="material-icons">add</i></a>
                
            <div class="main-info">
            <p>${properties.content.mainInfo}</p>
            <p><strong>Pro Tip:</strong> ${properties.content.proTip}</p>
            <p><strong>Local Resource: </strong><a href="${properties.content.link}" style="display:${properties.content.linkDisplay}" target="_blank">${properties.content.linkText}</a></p>
            </div>
            
          <div class="weather-container">
              <div class="weather-box">
              <img src="http://openweathermap.org/img/w/${weatherInfo.icon}.png"><i class="material-icons medium" style="transform: rotate(${weatherInfo.wind}deg)">arrow_downward</i>
              <ul>
              <li>${weatherInfo.conditions} at ${weatherInfo.time}</li>
              <li>Temperature: ${weatherInfo.tempC}°C</li>
              <li>Wind Speed: ${weatherInfo.knots} knots</li>
              </ul>
              </div>
          </div>

            </div>
          </div>
        
        
        `
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }

  }
}


