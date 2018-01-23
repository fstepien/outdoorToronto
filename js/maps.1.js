let map;
let myLatLng = { lat: 43.653226, lng: -79.383184 }


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
    content: "<form id=\"newlocation\"><input  placeholder=\"change your location\"></input><button class=\"btn grey\" type=\"submit\"><i class=\"material-icons\">home</i></button><form>"
  });
  var home = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "home",
    icon:"assets/home.png",
    
  });
  home.addListener('click', function () {
    homeWindow.open(map, home);
  });
 // ****************END HOME MARKER/WINDOW**************
fetch('js/locations.json')
.then(res => res.json())
.then((data) => {
  markersData = data;
  for (var i = 0; i < markersData.length; i++) {
    // Add marker
    addMarker(markersData[i]);
  }
})
.catch((err) => {console.log(`Sorry, ${err}. Go to http://www.escapetorontonow.com/ for weekend ideas`)});

function addMarker(properties) {

    let marker = new google.maps.Marker({
      position: properties.coords,
      map: map,
      title: `${properties.content.location}`,

    });

    //Set outside to prevent undefined properties in marker
    if (properties.iconImage) {
      marker.setIcon(properties.iconImage);
    }
    if (properties.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="row">
            <div class="col s12 m12 location-info">
              
                
                  
            <h4 class=title">${properties.content.location}</h4>
            <p><strong>Activities:</strong> ${properties.activities.a1} ${properties.activities.a2} ${properties.activities.a3} ${properties.activities.a4}</p>
            <p><i class="material-icons">directions_car</i> distance and travel time</p>
            <a class="btn-floating right waves-effect waves-light grey launch-modal" ${properties.content.modalNone}><i class="material-icons">add</i></a>
                
            <div class="main-info">
            <p>${properties.content.mainInfo}</p>
            <p><strong>Pro Tip:</strong> ${properties.content.proTip}</p>
            <p><strong>Local Resource: </strong><a href="${properties.content.link}" style="display:${properties.content.linkDisplay}" target="_blank">${properties.content.linkText}</a></p>
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


/*******************DISTANCE****************************** */

// let origin = new google.mapsLatLng(myLatLng.lat,myLatLng.lng);
// let destination = new google.mapsLatLng(markerData[i].coords.lat,markersData[i].coords.lng);
// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix({
//   origins: [origin],
//   destinations: [myLatLong]
// },callback);
// function callback(response, status) {
//   if (status == 'OK') {
//     var origins = response.originAddresses;
//     var destinations = response.destinationAddresses;

//     for (var i = 0; i < origins.length; i++) {
//       var results = response.rows[i].elements;
//       for (var j = 0; j < results.length; j++) {
//         var element = results[j];
//         var distance = element.distance.text;
//         var duration = element.duration.text;
//         var from = origins[i];
//         var to = destinations[j];
//       }
//     }
//   }
// }