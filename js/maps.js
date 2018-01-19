let map;
let myLatLng = { lat: 43.653226, lng: -79.383184 }

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });



  var markers = [
    {
      coords: { lat: 43.6532, lng: -79.3831 },
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content: '<h1>Home</h1>'
    },
    {
      coords: { lat: 43.5890, lng: -79.6441 },
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content: '<h1>Miss</h1>'
    },
    { coords: { lat: 44.5405, lng: -80.4081 } }
  ];



  for (var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }

  function addMarker(properties) {

    let marker = new google.maps.Marker({
      position: properties.coords,
      map: map,
      title: 'Home',

    });

    //Set outside to prevent undefined properties in marker
    if (properties.iconImage) {
      marker.setIcon(properties.iconImage);
    }
    if (properties.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: properties.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }

  }
}