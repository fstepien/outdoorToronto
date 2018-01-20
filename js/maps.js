let map;
let myLatLng = { lat: 43.653226, lng: -79.383184 }

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });


 
  // markers = [
  //   {
  //     coords: { lat: 43.6532, lng: -79.3831 },
  //     iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //     content: '<h1>Home</h1>'
  //   },
  //   {
  //     coords: { lat: 43.5890, lng: -79.6441 },
  //     iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //     content: '<h1>Miss</h1>'
  //   },
  //   { coords: { lat: 44.5405, lng: -80.4081 } }
  // ];

// FETCH MARKERS FROM JSON

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
      title: 'Home',

    });

    //Set outside to prevent undefined properties in marker
    if (properties.iconImage) {
      marker.setIcon(properties.iconImage);
    }
    if (properties.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: `${properties.content.location}`
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }

  }
}