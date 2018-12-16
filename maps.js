// On définit les variables de sessions et on les initialise si necessaires
var sessionStorage;


//On definit l'apparence de la carte
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


//    Affichage de la partie description de la station et formulaire de reservation
//on définit l'objet Formulaire qui affiche en fontion de la station choisie les carracteristiques de cette station ainsi que le formulaire de réservation
//propriétés:   mymap:map utilisée
//              station :station choisie
//                eltHtmlStation element contenant la déscription de la station
//                eltHtmlReservation element englobant l'element station et l'element formulaire
//                eltHtmlFormulaire contenant le formulaire de réservation
//presentationMessage
function StationFormulaire(mymap, station, eltHtmlStation, eltHtmlReservation, eltHtmlFormulaire, eltHtmlPresentation) {
  this.mymap = mymap,
    this.station = station,
    this.eltHtmlStation = eltHtmlStation,
    this.eltHtmlReservation = eltHtmlReservation,
    this.eltHtmlFormulaire = eltHtmlFormulaire;
  this.eltHtmlPresentation = eltHtmlPresentation;

  //Affichage de la description des stations 
  StationFormulaire.prototype.afficheForm = function () {
    if (sessionStorage.station_name === this.station.name) {
      document.getElementById(this.eltHtmlStation).innerHTML = '';
      document.getElementById(this.eltHtmlStation).innerHTML += '<h3> Détail de la station : ' + this.station.name + '</h3><p>Adresse : ' + this.station.address + '<br/><br/>' + this.station.bike_stands + ' places </li><br/>' + (this.station.available_bikes - 1) + ' vélos disponibles </p>';
    } else {
      document.getElementById(this.eltHtmlStation).innerHTML = '';
      document.getElementById(this.eltHtmlStation).innerHTML += '<h3> Détail de la station : ' + this.station.name + '</h3><p>Adresse : ' + this.station.address + '<br/><br/>' + this.station.bike_stands + ' places </li><br/>' + this.station.available_bikes + ' vélos disponibles </p>';
    }
    var veloDispo = this.station.available_bikes;
    document.getElementById(this.eltHtmlStation).style.display = "block";
    document.getElementById(this.eltHtmlReservation).style.display = "block";

    if (this.station.status !== "OPEN") {
      document.getElementById(this.eltHtmlStation).innerHTML += "<h3>Désolé cette station est actuellement fermée<h3>";
      document.getElementById(this.eltHtmlStation).style.display = "none";
    } else if (veloDispo === 0) {
      document.getElementById(this.eltHtmlStation).innerHTML += "<h3>Il n'y a pas de vélo disponible à cette station.<h3>";
      document.getElementById(this.eltHtmlFormulaire).style.display = "none";
    } else if (veloDispo != 0 && sessionStorage.temps == 0) {
      this.faireReservation();
      // stokage des variables station.Name et station.available_bikes dans une SessionStorage.
      sessionStorage.station_name = this.station.name;
      sessionStorage.station_Velos = this.station.available_bikes;

    } else if (sessionStorage.station_name === this.station.name) {
      veloDispo = this.station.available_bikes - 1;
      this.faireReservation();
      // stokage des variables station.Name et station.available_bikes dans une SessionStorage.
      sessionStorage.station_name = this.station.name;
      sessionStorage.station_Velos = this.station.available_bikes;
    } else {
      this.faireReservation();
      // stokage des variables station.Name et station.available_bikes dans une SessionStorage.
      sessionStorage.station_name = this.station.name;
      sessionStorage.station_Velos = this.station.available_bikes;
    }
  }
  // fonction qui affiche le formulaire si besoin et determine ce qu'il faut afficher dans le formulaire

  StationFormulaire.prototype.faireReservation = function () {

    document.getElementById(this.eltHtmlStation).style.display = "block";
    document.getElementById(this.eltHtmlFormulaire).style.display = "block";

    if (localStorage.length != 0) {
      document.getElementById("nom").value = localStorage.getItem("nom");
      document.getElementById("prenom").value = localStorage.getItem("prenom");
    } else {
      document.getElementById("nom").placeholder = '';
      document.getElementById("prenom").placeholder = '';
    }
  }
}


// mise en place des marqueurs stations à partir de l'api JC decaux
var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=ad3a6e37420a676bfb271c60b981f4adf221ae89';
ajaxGet(url, function (reponse) {

  var stations = JSON.parse(reponse);
  stations.forEach(function (station) {
    if (station.name === sessionStorage.station_name && sessionStorage.temps > 0) {
      station.available_bikes = station.available_bikes - 1;
    }
    if (station.status !== "OPEN") {
      var addMarker = L.marker([station.position.lat, station.position.lng], {
        icon: myIconFermee,
        title: station.number
      }).on('click', function () {
        var StationFormulaire1 = new StationFormulaire(mymap, station, "#fenetreStation", "#fenetrereservation", "#formulaire", "#presentationMessage");
        StationFormulaire1.afficheForm();
        markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation">Réserver</a>', {
          offset: L.point(-5, 0),
          direction: 'auto',
          permanent: false,
          sticky: false,
          interactive: false,
          opacity: 0.6
        }).addLayer(addMarker);
      })
      markersCluster.addLayer(addMarker);

    } else {
      if (station.available_bikes === 0) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconZero,
          title: station.number
        }).on('click', function () {
          var StationFormulaire2 = new StationFormulaire(mymap, station, "fenetreStation", "fenetrereservation", "formulaire", "#presentationMessage");
          StationFormulaire2.afficheForm();
          markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation">Réserver</a>', {
            offset: L.point(-5, 0),
            direction: 'auto',
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.6
          }).addLayer(addMarker);
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes <= 5 && station.bonus === true) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconOrangeBonus,
          title: station.number
        }).on('click', function () {
          var StationFormulaire3 = new StationFormulaire(mymap, station, "fenetreStation", "fenetrereservation", "formulaire", "#presentationMessage");
          StationFormulaire3.afficheForm();
          markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation">Réserver</a>', {
            offset: L.point(-5, 0),
            direction: 'auto',
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.6
          }).addLayer(addMarker);
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes <= 5 && station.bonus === false) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconOrange,
          title: station.number
        }).on('click', function () {
          var StationFormulaire4 = new StationFormulaire(mymap, station, "fenetreStation", "fenetrereservation", "formulaire", "#presentationMessage");
          StationFormulaire4.afficheForm();
          markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation">Réserver</a>', {
            offset: L.point(-5, 0),
            direction: 'auto',
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.6
          }).addLayer(addMarker);
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes > 5 && station.bonus === false) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconLibre,
          title: station.number
        }).on('click', function () {
          var StationFormulaire5 = new StationFormulaire(mymap, station, "fenetreStation", "fenetrereservation", "formulaire", "#presentationMessage");
          markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation">Réserver</a>', {
            offset: L.point(-5, 0),
            direction: 'auto',
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.6
          }).addLayer(addMarker);
          StationFormulaire5.afficheForm();
        })
        markersCluster.addLayer(addMarker);
      } else if (station.available_bikes > 5 && station.bonus === true) {
        var addMarker = L.marker([station.position.lat, station.position.lng], {
          icon: myIconLibreBonus,
          title: station.number
        }).on('click', function () {
          var StationFormulaire6 = new StationFormulaire(mymap, station, "fenetreStation", "fenetrereservation", "formulaire", "#presentationMessage");
          markersCluster.bindPopup('<h3> Station:</h3>' + station.name + '<br/> <a href="#fenetreStation"Réserver</a>', {
            offset: L.point(-5, 0),
            direction: 'auto',
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.6
          }).addLayer(addMarker);
          StationFormulaire6.afficheForm();
        })
        markersCluster.addLayer(addMarker);

      }
    }
  });
});

//-------------Initialisation:----------/

mymap.addLayer(markersCluster);
//sessionStorage.temps = 0;
