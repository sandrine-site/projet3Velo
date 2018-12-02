 //On definit l'apparence de la carte

 var mymap = L.map('mapid').setView([43.296867, 5.387092], 13);
 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox.streets',
   accessToken: 'pk.eyJ1Ijoic2FuZHJpbmVjbG9pdHJlIiwiYSI6ImNqcDJwZW5kMzA4dXgza3A4Nndxa2d3ZnoifQ.YmmEHgjVDPWedeomCY24cA'
 }).addTo(mymap);
 var resa = 0;
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
       }).on('click', function () {
         afficheForm(mymap, station);
       })
       markersCluster.addLayer(addMarker);
     } else {
       if (station.available_bikes === 0) {
         var addMarker = L.marker([station.position.lat, station.position.lng], {
           icon: myIconZero,
           title: station.number
         }).on('click', function () {
           afficheForm(mymap, station);
         })
         markersCluster.addLayer(addMarker);
       } else if (station.available_bikes <= 5 && station.bonus === true) {
         var addMarker = L.marker([station.position.lat, station.position.lng], {
           icon: myIconOrangeBonus,
           title: station.number
         }).on('click', function () {
           afficheForm(mymap, station);
         })
         markersCluster.addLayer(addMarker);
       } else if (station.available_bikes <= 5 && station.bonus === false) {
         var addMarker = L.marker([station.position.lat, station.position.lng], {
           icon: myIconOrange,
           title: station.number
         }).on('click', function () {
           afficheForm(mymap, station);
         })
         markersCluster.addLayer(addMarker);
       } else if (station.available_bikes > 5 && station.bonus === false) {
         var addMarker = L.marker([station.position.lat, station.position.lng], {
           icon: myIconLibre,
           title: station.number
         }).on('click', function () {
           afficheForm(mymap, station);
         })
         markersCluster.addLayer(addMarker);
       } else if (station.available_bikes > 5 && station.bonus === true) {
         var addMarker = L.marker([station.position.lat, station.position.lng], {
           icon: myIconLibreBonus,
           title: station.number
         }).on('click', function () {
           afficheForm(mymap, station);
         })
         markersCluster.addLayer(addMarker);
       }
     }
     //    Affichage de la partie description de la station et formulaire de reservation
     function afficheForm(mymap, station) {
       document.getElementById("fenetrestation").innerHTML = '';
       document.getElementById("fenetrestation").innerHTML += '<h3> Détail de la station : ' + station.name + '</h3><p>Adresse : ' + station.address + '<br/><br/>' + station.bike_stands + ' places </li><br/>' + station.available_bikes + ' vélos disponibles </p>';
       document.getElementById("fenetrestation").style.visibility = "visible";

       if (resa === 0) {
         document.getElementById("fenetrestation").innerHTML += "<h3> Pour réserver un vélo veuillez renseigner le fomulaire çi dessous<h3>"
       }
     };
     mymap.addLayer(markersCluster);
   });
 })
