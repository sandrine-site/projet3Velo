//----------initialisation-----------//
var localStorage;
var sessionStorage;

//-----------------Instanciation du slider--------------------------------//
//-----------------fichier:diaporama.js----------------------------------//
//on fixe comme constantes de départ:
//l'id du slider                      ici #slider
//le temps de chaque diapo en ms      ici 5000
//la largeur du slider en pourcent    ici 50
//le nombre d'images du slider        ici 5
//l'id des contrôles                  ici #control
//                                    #flecheavance
//                                    #flecherecul

var slider = new Slider("slider", 5000, 50, 5, "#control", "#flecheavance", "#flecherecul",
  document);
var play = 1;
var entreDeux;
slider.taille();
slider.imageReste();

//----------------Instanciation de la class MessageFin-----------------------//
//----------------fichier:message_fin.js------------------------------------//

//EltHtmlPresentation                     presentationMessage
//elthtmlmessage                          message
//idreservation                           fenetrereservation
//id Station                              fenetreStation
//id formulaire                           formulaire
//id message                            messageTemps
//idpresentation                           Glegende
//id signature                              canvas

var messageAfficheFin = new MessageFin("presentationMessage", "message", "fenetrereservation", "fenetreStation", "formulaire", "messageTemps", "Glegende", "canvas");


//-----------Instanciation de la calss Nouvelle Signature------------------------------//
//----------------fichier:signature.js---------------------------------------------//
//
//canvasId                     canvas
//lineWidth                    1.5 px
// linecolor                   #3364fe
// click                       0 au départ

var signature = new NouvelleSignature("canvas", 1.5, "#3364fe", 0);

signature.Initialisation();




//-----------Instanciation de la calss ValidWindow------------------------------//
//----------------fichier:valid.js---------------------------------------------//
//
//idStation                     fenetreStation
//idNom                         nom
// idPrenom                     prenom

var valid = new ValidWindow("fenetreStation", "nom", "prenom");

// Lors du chargement de la fenetre on regarde si il y a une déjà une réservation auquel cas on affiche le message

window.addEventListener("load", valid.StartFunction(parseInt(sessionStorage.click), localStorage.nom, localStorage.prenom));

//Validation du formulaire et affichage du message de confirmation

var form = document.querySelector("form");
form.addEventListener("reset", function (e) {
  e.preventDefault
  valid.ResetFunction()
});
form.addEventListener("submit", function (e) {
  e.preventDefault
  valid.ValidFunction("nom", "prenom", parseInt(sessionStorage.click))
});
