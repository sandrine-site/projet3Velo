//initialisation des variables
var localStorage;
var sessionStorage;
var len;
var validPlus = 0;

// définition de la class nouvelle signature
//canvasId  id du canvas définit dans le HTML
//typeImput       mousse ou touch
//lineWidth       épaisseur du tracé
// color          couleur du tracé
function NouvelleSignature(canvasId, lineWidth, lineColor) {
  //initialisation des variables
  this.canvasId = canvasId;
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  var stylo;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();

  //Initialisation du canvas
  this.Initialisation = function () {
    var canvas = document.getElementById(this.canvasId);
    var context = canvas.getContext("2d");

    //on définit les carractéristiques du trait
    context.lineWidth = this.lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = this.lineColor;
    // au cas où..
    if (!canvas) {
      alert("Impossible de récupérer le canvas");
      return;
    }
    if (!context) {
      alert("Impossible de récupérer le context du canvas");
      return;
    }

    //Evenements souris

    canvas.addEventListener("mousedown", function (e) {
      e.preventDefault();
      stylo = true;
      // on compléte la liste de coordonées
      clickX.push(e.pageX - canvas.offsetLeft);
      clickY.push(e.pageY - canvas.offsetTop);
      clickDrag.push(false);
      // permet de dessiner un point
      NouvelleSignature.dessiner(context);
      e.stopPropagation();
    });

    // si le stylo est appuyé et est dans le canvas on dessine (glissement)

    canvas.addEventListener("mousemove", function (e) {
      console.log(e);
      e.preventDefault();
      if (stylo === true) {
        clickX.push(e.pageX - canvas.offsetLeft);
        clickY.push(e.pageY - canvas.offsetTop);
        clickDrag.push(true);
        NouvelleSignature.dessiner(context);
      }
    });
    //Si le stylo est dans la feuille mais que la pointe est en l'air
    canvas.addEventListener("mouseup", function () {
      stylo = false;
    }, false);
    // si le stylo sort de la zonne canvas on arrete le dessin
    canvas.addEventListener("mouseleave", function () {
      stylo = false;
    }, false);

    //Evenements tactiles
    // moment où le doigt touche l'écran
    var startX, startY
    canvas.addEventListener("touchstart", function (e) {
      console.log(e);
      stylo = true;
      e.preventDefault();
      clickX.push(e.changedTouches[0].clientX - canvas.offsetLeft);
      clickY.push(e.changedTouches[0].clientY - canvas.offsetTop);
      clickDrag.push(false);
      NouvelleSignature.dessiner(context);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      console.log(e);
      if (stylo === true) {
        for (var i = 0; i < e.touches.length; i++) {
          clickX.push(e.targetTouches[i].clientX - canvas.offsetLeft);
          clickY.push((e.targetTouches[i].clientY - canvas.offsetTop) + 100);
          console.log(clickX[i] + " y: " + clickY[i])
          clickDrag.push(true);
        }
        NouvelleSignature.dessiner(context);
      }
    }, false);
    canvas.addEventListener("touchend", function (e) {
      stylo = false;
    }, false);

    //à chaque appel de la fonction dessiner on efface le context et on redessine tout
    NouvelleSignature.dessiner = function (context) {
      console.log(clickX + " y: " + clickY + " drag " + clickDrag)
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      for (var i = 0; i < clickX.length; i++) {
        console.log(clickX[i] + " y: " + clickY[i] + clickDrag[i])
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          //dessine 1 point
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
        len = clickX.length;
      }
      return;
    };

    NouvelleSignature.clearCanvas = function (context) {
      var body = document.getElementById("body");
      var canvas = document.getElementById("signature");
      var context = canvas.getContext("2d");
      var dessin = document.getElementById("dessin");
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      clickX = [];
      clickY = [];
      clickDrag = [];
    }

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
      messageAfficheFin.ecrireMessage(nom, prenom);
      messageAfficheFin.diminuerCompteur(parseInt(sessionStorage.temps));
    });
  }

};


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

    this.ecrireMessage = function (nom, prenom) {
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
        document.getElementById(this.eltHtmlPresentation).style.display = "block";
        document.getElementById(this.eltHtmlMessage).innerHTML = "<h3>Vélo réservé à la station " + sessionStorage.station_name + " par " + localStorage.prenom + " " + localStorage.nom + " </h3>";
      };
    }

  //décompte du temps qu'il reste
  this.diminuerCompteur = function (temps) {
    if (temps > 0 && validPlus == 1) {
      temps = temps - 1;
      sessionStorage.temps = temps;
      document.getElementById(idMessage).innerHTML = this.tempsLitteral(temps);
      sout = setTimeout("messageAfficheFin.diminuerCompteur(" + temps + ")", 1000);
    } else {
      validPlus = 1;
      sessionStorage.temps = 100;
      clearInterval;
    }
  };

  this.tempsLitteral = function (seconde) {
    var s, m
    s = seconde % 60;
    m = seconde >= 60 ? Math.floor(seconde / 60 % 60) : 0;
    if (m !== 0) {
      if (s !== 0) {
        textetemps = "<h3>il vous reste : " + m + " min." + s + " s.</h3>";
      } else {
        textetemps = "<h3>il vous reste : " + m + " min.</h3>";
      }
    } else {
      if (s !== 0) {
        textetemps = "<h3>il vous reste : " + s + " s.</h3>";
      } else {
        textetemps = "<h3>le temps est écoulé votre réservation a été annulée.</h3>";
      };
    }
    return textetemps;
  };
}
//Lancement de la fonction signature (init) quand tous est prêt
var signature = new NouvelleSignature("canvas", 1.5, "#3364fe");
signature.Initialisation();
var textetemps = "";
var messageAfficheFin = new MessageFin("presentationMessage", "message", "fenetrereservation", "fenetreStation", "formulaire", "messageTemps");
