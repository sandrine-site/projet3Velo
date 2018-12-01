var mymap = L.map('mapid').setView([43.296867, 5.387092], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA'
}).addTo(mymap);



var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=ad3a6e37420a676bfb271c60b981f4adf221ae89';
ajaxGet(url, function (reponse) {
  var moyennelat = 0;

  var moyennelng = 0;
  var stations = JSON.parse(reponse);
  var maxlat = 50;
  var maxlng = 50

  stations.forEach(function (station) {

    moyennelat = moyennelat + station.position.lat;
    moyennelng = moyennelng + station.position.lng;
    if ((station.position.lat) < maxlat) {
      maxlat = station.position.lat
    };
    if ((station.position.lng) < maxlng) {
      maxlng = station.position.lng
    };
  });
  var Lati = moyennelat / 129;
  var longi = moyennelng / 129;
  console.log(Lati + "/" + longi + "maxlat = " + maxlat + "maxlng=" + maxlng);
})
