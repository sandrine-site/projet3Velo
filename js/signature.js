



var len;
var localStorage;

function init() {

  var body = document.getElementById("body");
  var canvas = document.getElementById("signature");
  var context = canvas.getContext("2d");
  var dessin = document.getElementById("dessin");
  var inputType = "mouse";
  var stylo;


  //on définit les carractéristiques du trait
  context.lineWidth = 1.5;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#3364fe";

  // on relie les évenements de la souris au dessin dans le canvas à l'aide d' EventListenner
  canvas.addEventListener("mousedown", function (e) {
    stylo = true;
    addClick(e.layerX - canvas.offsetLeft, ((e.layerY - canvas.offsetTop) / 2) + 15, false);
    dessiner();
    e.preventDefault();
    e.stopPropagation();
  });

  // si le stylo est appuyé et dans le canvas on dessine (glissement)
  canvas.addEventListener("mousemove", function (e) {
    if (stylo === true) {
      addClick(e.layerX - canvas.offsetLeft, ((e.layerY - canvas.offsetTop) / 2) + 15, true);
      dessiner()
    }
  });

  //stylo = pointe du stylo si =true =click souris =>on ecrit
  canvas.addEventListener("mouseup", function (e) {
    stylo = false
  })

  // si le stylo sort de la zonne canvas on arrete le dessin
  canvas.addEventListener("mouseleave", function () {
    stylo = false
  });


  //enregistrement de la position de la sourisdans ainsi que du glissement un tableau;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  len = clickX.length;

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    len = clickX.length;
  }

  //à chaque appel de la fonction dessiner on efface le context et on redessine tout

  function dessiner() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
  }
}
//Lancement de la fonction signature (init) quand tous est prêt
window.onload = init

//Validation du formulaire et affichage du message de confirmation
var compteur = 0;
var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var nomElt =  document.getElementById("nom");
  var nom=form.elements.nom.value
 var prenomElt =  document.getElementById("prenom");
  var prenom=prenomElt.value
console.log(nom);
  ecrireMessage()


//Validation du formulaire par l'utilisateur


function ecrireMessage() {
  // len=longueur de la liste des position de la souris pour écrire
  if (len !== 0 && nom !== "" && prenom !== "") {
var textetemps = ""
    temps = 1200;
   
    // Si le formulaire est valide on stoke le nom et le prenom dans une variable locale 
    localStorage.nom=nom;
    localStorage.prenom=prenom;
console.log(localStorage.nom);
    document.getElementById("presentationMessage").style.visibility = "visible";


    document.getElementById("message").innerHTML += "<h3>Vélo réservé à la station " + sessionStorage.getItem("stationName") + " par " + localStorage.getItem("prenom") + " " + localStorage.getItem("nom") +affichage(1200)+" </h3>"
    console.log("<h3>Vélo réservé à la station " + sessionStorage.getItem("stationName") + " par " + localStorage.getItem("prenom") + " " + localStorage.getItem("nom") + affichage(1200) + " </h3>")

  

//décompte du temps qu'il reste
    function affichage (tempsInitial)
   
{
   diminuerCompteur(tempsInitial);
  function diminuerCompteur(temps) {
  if (temps > 0) {
    temps = temps - 1
     var tempsL=tempsLitteral(temps);
    sout = setTimeout(diminuerCompteur, 1000);
  } else {
    clearInterval
  }
return tempsL
}
function tempsLitteral(seconde) {
  var s, m
  s = seconde % 60;
  m = seconde >= 60 ? Math.floor(seconde / 60 % 60) : 0;
  
  if (m !== 0) {
    if (s !== 0) {
      textetemps = ", il vous reste : " + m + " min." + s + " s.</p>"
    } else {
      textetemps = "<p>, il vous reste : " + m + " min."
    }
  } else {
    if (s !== 0) {
      textetemps = ", il vous reste : " + s + " s."
    } else {
      textetemps = ", le temps est écoulé votre réservation a été annulée."
    };
  }
  return textetemps
}};}
else if (len === 0){
  document.getElementById("signature").style.border = " 2px solid red";
}
}});