//Lancement de la fonction signature (init) quand tous est prêt
var signature = new NouvelleSignature("canvas", 1.5, "#3364fe");
signature.Initialisation();

//Insranciation de la class MessageFin
var messageAfficheFin = new MessageFin("presentationMessage", "message", "fenetrereservation", "fenetreStation", "formulaire", "messageTemps");

//Validation du formulaire et affichage du message de confirmation

var form = document.querySelector("form");
form.addEventListener("reset", function (e) {
  signature.clearCanvas(context);
  validPlus = 0;
  document.getElementById("nom").placeholder = '';
  document.getElementById("prenom").placeholder = '';
});
form.addEventListener("submit", function (e) {
  sessionStorage.temps = 100;
  e.preventDefault();
  validPlus = (validPlus + 1);
  var nom = form.elements["nom"].value;
  var prenom = form.elements["prenom"].value;
  signature.clearCanvas;

  messageAfficheFin.ecrireMessage(nom, prenom, 0);

});
