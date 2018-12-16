//Instanciation de la class MessageFin
var messageAfficheFin = new MessageFin("presentationMessage", "message", "fenetrereservation", "fenetreStation", "formulaire", "messageTemps");

//Instanciation de la class NouvelleSignature puis lancement de la methode Initialisation.
var signature = new NouvelleSignature("canvas", 1.5, "#3364fe");
signature.Initialisation();


StartFunction = function () {
  if (Date.now() - sessionStorage.dateReservation <= 1200000) {
    document.getElementById("fenetreStation").innerHTML += "<h3> Attention, vous avez déjà une réservation en cours, une nouvelle réservation entrainera une annulation de la précédente.<h3>";
    messageAfficheFin.ecrireMessage(localStorage.nom, localStorage.prenom, false)

  }
}

window.addEventListener("load", StartFunction());

//Validation du formulaire et affichage du message de confirmation

var form = document.querySelector("form");
form.addEventListener("reset", function (e) {
  signature.clearCanvas();
  document.getElementById("nom").placeholder = '';
  document.getElementById("prenom").placeholder = '';


});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validPlus = (validPlus + 1);
  var nom = form.elements["nom"].value;
  var prenom = form.elements["prenom"].value;
  signature.clearCanvas();
  messageAfficheFin.ecrireMessage(nom, prenom, true);
  console.log(messageAfficheFin.delaisLocation)
});
