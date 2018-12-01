var mymap = L.map('mapid').setView([43.296867, 5.387092], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA'
}).addTo(mymap);




// définition des icones
var myIconOrange = L.icon({
  iconUrl: 'images/VeloOrange.png',
  iconSize: [21, 24]
});
var myIconOrangeBonus = L.icon({
  iconUrl: 'images/VeloOrangeBonus.png',
  iconSize: [21, 24]
});
var myIconFermee = L.icon({
  iconUrl: 'images/StationFermee.png',
  iconSize: [21, 24]
});
var myIconZero = L.icon({
  iconUrl: 'images/VeloZero.png',
  iconSize: [21, 24]
});
var myIconLibreBonus = L.icon({
  iconUrl: 'images/VeloLibreBonus.png',
  iconSize: [21, 24]
});
var myIconLibre = L.icon({
  iconUrl: 'images/VeloLibre.png',
  iconSize: [21, 24]
});

var markersCluster = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: false,
  showCoverageOnHover: false
});



// mise en place des marqueurs stations
var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=ad3a6e37420a676bfb271c60b981f4adf221ae89';
ajaxGet(url, function (reponse) {

  var stations = JSON.parse(reponse);
  stations.forEach(function (station) {
    if (station.status != "OPEN") {
      var addMarker = L.marker([station.position.lat, station.position.lng], {
        icon: myIconFermee,
        title: station.number
      })
      markersCluster.addLayer(addMarker);
    } else {
      if (station.available_bikes === 0) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconZero,
          title: station.number
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes <= 5 && station.bonus === true) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconOrangeBonus,
          title: station.number
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes <= 5 && station.bonus === false) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconOrange,
          title: station.number
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes > 5 && station.bonus === false) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconLibre,
          title: station.number
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes > 5 && station.bonus === true) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconLibreBonus,
          title: station.number
        })
        markersCluster.addLayer(addMarker);
      }
    }
  });

  mymap.addLayer(markersCluster);


});



//  stations.forEach(function (station) {
//    if (station.position.lat <= 43.25) {
//      if (station.position.lng <= 5.36) {
//
//        var latLng = new L.latLng(43.25, 5.36);
//        var marker = new L.Marker(latLng, {
//          title: "groupe1"
//        });
//        markers.addLayer(marker);
//
//      } else if (station.position.lng <= 5.37 || station.position.lng > 5.36) {
//        var latLng = new L.latLng(43.25, ((5.36 + 5.37) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe2"
//        });
//        markers.addLayer(marker);
//
//      } else if (station.position.lng <= 5.38 || station.position.lng > 5.37) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.37) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe3"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.39 || station.position.lng > 5.38) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.39) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe4"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.40 || station.position.lng > 5.39) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.39) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe5"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.41 || station.position.lng > 5.40) {
//        var latLng = new L.latLng(43.25, ((5.39 + 5.40) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe6"
//        });
//        markers.addLayer(marker);
//      } else {
//        var latLng = new L.latLng(43.25, ((5.40 + 5.41) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe7"
//        });
//        markers.addLayer(marker);
//      };
//    } else if (station.position.lng <= 43.26 || station.position.lat > 43.25) {
//            if (station.position.lng <= 5.36) {
//
//        var latLng = new L.latLng((43.26 +43.25) / 2, 5.36);
//        var marker = new L.Marker(latLng, {
//          title: "groupe8"
//        });
//        markers.addLayer(marker);
//
//      } else if (station.position.lng <= 5.37 || station.position.lng > 5.36) {
//        var latLng = new L.latLng(43.25, ((5.36 + 5.37) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe2"
//        });
//        markers.addLayer(marker);
//
//      } else if (station.position.lng <= 5.38 || station.position.lng > 5.37) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.37) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe3"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.39 || station.position.lng > 5.38) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.39) / 2));
//        var marker = new L.Marker(latLng, {
//          title: "groupe4"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.40 || station.position.lng > 5.39) {
//        var latLng = new L.latLng(43.25, ((5.38 + 5.39) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe5"
//        });
//        markers.addLayer(marker);
//      } else if (station.position.lng <= 5.41 || station.position.lng > 5.40) {
//        var latLng = new L.latLng(43.25, ((5.39 + 5.40) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe6"
//        });
//        markers.addLayer(marker);
//      } else {
//        var latLng = new L.latLng(43.25, ((5.40 + 5.41) / 2))
//        var marker = new L.Marker(latLng, {
//          title: "groupe7"
//        });
//        markers.addLayer(marker);
//      };
//    }
//
//    };
//  });







//addMarker.bindPopup("<b id=popuptitre style= color:#3364FE>" + station.name + "</b><br> nombre de vélo disponibles : " + station.available_bikes).openPopup();
