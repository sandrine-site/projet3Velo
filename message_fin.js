//calss MessageFin:
//aprés validation du formulaire par l'utilisateur elle affiche le message de réservation
//objet MessageFin:
// eltHtmlPresentation       element où s'affiche le message de fin
//temps                      temps entre la réservation et l'annulation

function MessageFin(eltHtmlPresentation, eltHtmlMessage, idreservation, idStation, idformulaire, idMessage) {

  // len=longueur de la liste des position de la souris dans le canvas
  this.eltHtmlPresentation = eltHtmlPresentation,
    this.eltHtmlMessage = eltHtmlMessage,
    this.idreservation = idreservation,
    this.idStation = idStation,
    this.idformulaire = idformulaire;
  this.idMessage = idMessage,
    validPlus = 0;

  this.ecrireMessage = function (nom, prenom, load) {
    if (load === 0) {
      //on verifie que les chapms sont remplis
      if (len === 0) {
        document.getElementById("signature").style.border = " 2px solid red";
      } else if (nom == "") {
        document.getElementById("nom").style.border = " 2px solid red";
      } else if (prenom == "") {
        document.getElementById("prenom").style.border = " 2px solid red";
      } else {
        // Si le formulaire est valide on stoque le nom et le prenom dans une variable locale on efface le formulaire
        document.getElementById(idreservation).style.display = "none";
        document.getElementById(idStation).style.display = "none";
        document.getElementById(idformulaire).style.display = "none";
        localStorage.nom = nom;
        localStorage.prenom = prenom;
        myDate = Date.now();
        sessionStorage.setItem('dateReservation', myDate);
        console.log(myDate)
      }
      localStorage.station_reserv = localStorage.station_name;
    }
    myDate = sessionStorage.dateReservation
    document.getElementById(this.eltHtmlPresentation).style.display = "block";
    document.getElementById(this.eltHtmlMessage).innerHTML = "<h3>Vélo réservé à la station " + sessionStorage.station_name + " par " + localStorage.prenom + " " + localStorage.nom + " </h3>";
    millis = Date.now() - myDate;
    diminuerCompteur();
  }
  var millis
  var myDate
  diminuerCompteur = function () {
    if (millis <= 12000) {
      setTimeout(function () {
        millis = Date.now() - myDate;
        console.log("seconds elapsed = " + Math.floor(millis / 1000));
        this.tempsLitteral(1200000 - millis);
        console.log(this.tempsLitteral(1200000 - millis));
        document.getElementById(idMessage).innerHTML = this.tempsLitteral(120000 - millis);
        diminuerCompteur();
      }, 1000);
    }


    this.tempsLitteral = function (milliSeconde) {
      var s, m, seconde
      seconde = Math.floor(milliSeconde / 1000)
      s = seconde % 60,
        texteSec = "";
      texteSec = (s === 0) ? " </h3>" : (s + " s.</h3>");
      m = seconde >= 60 ? Math.floor(seconde / 60 % 60) : 0;
      var tm = m,
        texteMin = "";
      texteMin = (tm === 0) ? "<h3>il vous reste : " : "<h3>il vous reste : " + m + " min.";
      var textetemps = (s + tm !== 0) ? texteMin + texteSec : " <h3>le temps est écoulé votre réservation a été annulée.</h3>";

      return textetemps;
    };
  }
};
//};
////Lancement de la fonction signature(init) quand tous est prêt
//var textetemps = "";
