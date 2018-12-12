var localStorage;
var len;

// définition de la class nouvelle signature
//canvasId  id du canvas définit dans le HTML
//typeImput       mousse ou touch
//lineWidth       épaisseur du tracé
// color          couleur du tracé
function NouvelleSignature(canvasId, typeInput, lineWidth, color) {
  this.canvasId = canvasId,
    this.typeInput = typeInput,
    this.lineWidth = lineWidth,
    this.color = color;
  var stylo;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();

  this.Initialisation = function () {

    var canvas = document.getElementById(this.canvasId);
    var context = canvas.getContext("2d");
    console.log(canvas)
    //on définit les carractéristiques du trait
    context.lineWidth = this.lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = this.color;

    if (!canvas) {
      alert("Impossible de récupérer le canvas");
      return;
    }
    if (!context) {
      alert("Impossible de récupérer le context du canvas");
      return;
    }

    var x;
    var y;

    //Evenements souris
    canvas.addEventListener("mousedown", function (e) {
      e.preventDefault();
      stylo = true;
      clickX.push(e.pageX - canvas.offsetLeft);
      clickY.push(e.pageY - canvas.offsetTop);
      clickDrag.push(false);
      NouvelleSignature.dessiner(context);
      e.preventDefault();
      e.stopPropagation();
    });
    // si le stylo est appuyé et dans le canvas on dessine (glissement)
    canvas.addEventListener("mousemove", function (e) {
      e.preventDefault();
      if (stylo === true) {
        clickX.push(e.pageX - canvas.offsetLeft);
        clickY.push(e.pageY - canvas.offsetTop);
        clickDrag.push(true);
        NouvelleSignature.dessiner(context);
      }
    });
    //stylo = pointe du stylo si =true =click souris =>on ecrit
    canvas.addEventListener("mouseup", function () {
      stylo = false;
    });
    // si le stylo sort de la zonne canvas on arrete le dessin
    canvas.addEventListener("mouseleave", function () {
      stylo = false;
    });

    //Evenements tactiles

    canvas.addEventListener("touchstart", function (e) {
      stylo = true;
      e.preventDefault();
      clickX.push(e.pageX - canvas.offsetLeft);
      clickY.push(e.pageY - canvas.offsetTop);
      clickDrag.push(false);
      NouvelleSignature.dessiner(context)
    }, false);
    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      if (stylo === true) {
        clickX.push(e.pageX - canvas.offsetLeft);
        clickY.push(e.pageY - canvas.offsetTop);
        clickDrag.push(true);
        NouvelleSignature.dessiner(context);

      }
    }, false);
    canvas.addEventListener("touchend", function (e) {
      stylo = false
    }, false);
    canvas.addEventListener("touchleave", function (e) {
      stylo = false
    }, false);

    //à chaque appel de la fonction dessiner on efface le context et on redessine tout
    NouvelleSignature.dessiner = function (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      for (var i = 0; i < clickX.length; i++) {
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

    this.clearCanvas = function (context) {
      console.log("annuler")
      context.clearRect(0, 0, 250, 250);
      clickX = [];
      clickY = [];
      clickDrag = [];
      len = 0;
    };

    //Validation du formulaire et affichage du message de confirmation

    var form = document.querySelector("form");
    form.addEventListener("reset", function () {
      console.log("reset")
      signature.clearCanvas(context);
      document.getElementById("nom").placeholder = '';
      document.getElementById("prenom").placeholder = '';
    });
    form.addEventListener("submit", function (e) {
      console.log("submit")
      sessionStorage.temps = 1200;
      e.preventDefault();
      var nom = form.elements["nom"].value;
      var prenom = form.elements["prenom"].value;
      signature.clearCanvas;
      messageAfficheFin.ecrireMessage(nom, prenom);
      messageAfficheFin.diminuerCompteur(parseInt(sessionStorage.temps));
    });
  }

};
//Validation du formulaire par l'utilisateur
//objet MessageFin:
// eltHtmlPresentation       element où s'affiche le message de fin
//temps                      temps entre la réservation et l'annulation

function MessageFin(eltHtmlPresentation, eltHtmlMessage, idreservation, idStation, idformulaire, validPlus, idMessage) {
  // len=longueur de la liste des position de la souris pour écrire
  this.eltHtmlPresentation = eltHtmlPresentation,
    this.eltHtmlMessage = eltHtmlMessage,
    this.idreservation = idreservation,
    this.idStation = idStation,
    this.idformulaire = idformulaire;
  this.validPlus = validPlus,
    this.idMessage = idMessage,

    this.ecrireMessage = function (nom, prenom) {
      if (len === 0) {
        document.getElementById("signature").style.border = " 2px solid red";
      } else if (nom == "") {
        document.getElementById("nom").style.border = " 2px solid red";
      } else if (prenom == "") {
        document.getElementById("prenom").style.border = " 2px solid red";
      } else {
        // Si le formulaire est valide on stoque le nom et le prenom dans une variable locale 
        document.getElementById(idreservation).style.display = "none";
        document.getElementById(idStation).style.display = "none";
        document.getElementById(idformulaire).style.display = "none";
        localStorage.nom = nom;
        localStorage.prenom = prenom;
        document.getElementById(this.eltHtmlPresentation).style.display = "block";
        document.getElementById(this.eltHtmlMessage).innerHTML = "<h3>Vélo réservé à la station " + sessionStorage.stationName + " par " + localStorage.prenom + " " + localStorage.nom + " </h3>";
      };
    }

  //décompte du temps qu'il reste

  this.diminuerCompteur = function (temps) {
    console.log(temps);
    if (temps > 0 && this.validPlus === 1) {
      console.log(temps);
      temps = temps - 1;
      sessionStorage.temps = temps;
      console.log(idMessage);
      document.getElementById(idMessage).innerHTML = this.tempsLitteral(temps);
      sout = setTimeout("messageAfficheFin.diminuerCompteur(" + temps + ")", 1000);
      console.log(temps);
    } else {
      clearInterval
      this.validPlus = 1;
    }
  };

  this.tempsLitteral = function (seconde) {
    var s, m
    s = seconde % 60;
    m = seconde >= 60 ? Math.floor(seconde / 60 % 60) : 0;

    if (m !== 0) {
      if (s !== 0) {
        textetemps = "<h3>il vous reste : " + m + " min." + s + " s.</h3>"
      } else {
        textetemps = "<h3>il vous reste : " + m + " min.</h3>"
      }
    } else {
      if (s !== 0) {
        textetemps = "<h3>il vous reste : " + s + " s.</h3>"
      } else {
        textetemps = "<h3>le temps est écoulé votre réservation a été annulée.</h3>"
      };
    }
    return textetemps;
  }
}
//Lancement de la fonction signature (init) quand tous est prêt
var signature = new NouvelleSignature("canvas", "mouse", 1.5, "#3364fe");
window.onload = signature.Initialisation();
var textetemps = ""
var messageAfficheFin = new MessageFin("presentationMessage", "message", "fenetrereservation", "fenetreStation", "formulaire", 1, "messageTemps");
