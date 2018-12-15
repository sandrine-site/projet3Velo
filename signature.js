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
    canvas.addEventListener("touchstart", function (e) {
      console.log(e);
      stylo = true;
      e.preventDefault();
      clickX.push(e.changedTouches[0].pageX - canvas.offsetLeft);
      clickY.push(e.changedTouches[0].pageY - canvas.offsetTop);
      clickDrag.push(false);
      NouvelleSignature.dessiner(context);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      console.log(e);
      if (stylo === true) {
        for (var i = 0; i < e.touches.length; i++) {
          clickX.push(e.targetTouches[i].pageX - canvas.offsetLeft);
          clickY.push((e.targetTouches[i].pageY - canvas.offsetTop));
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

//Lancement de la fonction signature (init) quand tous est prêt
var signature = new NouvelleSignature("canvas", 1.5, "#3364fe");
signature.Initialisation();
