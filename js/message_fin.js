//---------------------------calss MessageFin------------------------------//

//après validation du formulaire par l'utilisateur elle affiche le message de réservation
//objet Message Fin:
//EltHtmlPresentation                     conteneur où s'affiche le message de fin
//elthtmlmessage                          id du message
//idreservation                           id où l'on a fait la réservation
//id Station                              description de la station
//id formulaire                           formulaire de réservation
//id message                              id des légendes de la carte
//idpresentation                          id du conteneur de la légende de carte
//id signature                            id du canvas où se trouve la signature
//----------! Attention à ne pas confondre elthtmlmessage et id Message----------//


function MessageFin(eltHtmlPresentation, eltHtmlMessage, idreservation, idStation, idformulaire, idMessage, idpresentation, idSignature) {

  this.eltHtmlPresentation = eltHtmlPresentation;
  this.eltHtmlMessage = eltHtmlMessage;
  this.idreservation = idreservation;
  this.idStation = idStation;
  this.idformulaire = idformulaire;
  this.idMessage = idMessage;
  this.idpresentation = idpresentation;
  this.idSignature = idSignature;
  var millis;
  var myDate;


  this.ecrireMessage = function (click, nom, prenom, load) {
    //on verifie que les champs sont remplis
    if (load) {
      if (click === 0) {
        document.getElementById(this.idSignature).style.border = " 2px solid red";
      } else if (nom == "") {
        document.getElementById("nom").style.border = " 2px solid red";
      } else if (prenom == "") {
        document.getElementById("prenom").style.border = " 2px solid red";
      } else {
        // Si le formulaire est valide on stocke le nom et le prenom dans une variable locale on efface le formulaire
        signature.clearCanvas();
        document.getElementById(idreservation).style.display = "none";
        document.getElementById(idStation).style.display = "none";
        document.getElementById(idformulaire).style.display = "none";
        document.getElementById(idpresentation).style.display = "none";
        localStorage.nom = nom;
        localStorage.prenom = prenom;
        myDate = Date.now();
        sessionStorage.setItem('dateReservation', myDate);
        localStorage.station_reserv = localStorage.station_name;
        document.getElementById(this.eltHtmlPresentation).style.display = "block";
        document.getElementById(this.eltHtmlMessage).innerHTML = "<h3>Vélo réservé à la station " + sessionStorage.station_name + " par " + localStorage.prenom + '&nbsp;' + localStorage.nom + " </h3>";
        millis = Date.now() - myDate;
        diminuerCompteur();
      }
    } else {
      document.getElementById(idpresentation).style.display = "none";
      myDate = sessionStorage.dateReservation;
      document.getElementById(this.eltHtmlPresentation).style.display = "block";
      document.getElementById(this.eltHtmlMessage).innerHTML = "<h3>Vélo réservé à la station " + sessionStorage.station_name + " par " + localStorage.prenom + '&nbsp;' + localStorage.nom + " </h3>";
      millis = Date.now() - myDate;
      diminuerCompteur();
    }
  }

  diminuerCompteur = function () {
    if (millis < 1200000) {
      setTimeout(function () {
        millis = Date.now() - myDate;
        tempsLitteral(1200000 - millis);
        document.getElementById(idMessage).innerHTML = tempsLitteral(1200000 - millis);
        diminuerCompteur(millis);
      }, 1000);
    } else {
      sessionStorage.dateReservation = 0;
      myDate = 0;
    }
  }

  tempsLitteral = function (milliSeconde) {
    var s, m, seconde;
    var textetemps = "";
    var texteSec = "";
    var texteMin = "";
    seconde = Math.floor(milliSeconde / 1000);
    s = seconde % 60;
    texteSec = (s === 0) ? " </h3>" : (s + " &nbsp;s.</h3>");
    m = seconde >= 60 ? Math.floor(seconde / 60 % 60) : 0;
    texteMin = (m === 0) ? "<h3>il vous reste : " : "<h3>il vous reste :" + " " + m + " &nbsp;" + "min.";
    textetemps = (s + m >= 0) ? texteMin + texteSec : " <h3>le temps est écoulé votre réservation a été annulée.</h3>";
    return textetemps;
  };
}
