//---------------------------class Nouvelle Signature------------------------------//

//Sert à afficher la signature dans le canvas
//canvasId                     id du canvas définit dans le HTML
//lineWidth                    épaisseur du tracé
// linecolor                   couleur du tracé
// click                       nombre de déplacement comptabilisé sur la surface canvas


function NouvelleSignature(canvasId, lineWidth, lineColor, click) {

  this.canvasId = canvasId;
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  this.click = click;
  var stylo;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var context

  //on stoque le nombre de click dans session storage afin de pouvoir le réutiliser
  sessionStorage.click = 0


  //Initialisation du canvas
  this.Initialisation = function () {
    var canvas = document.getElementById(this.canvasId);
    context = canvas.getContext("2d");

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

    //----------- Evenements souris-----------------//

    canvas.addEventListener("mousedown", function (e) {
      e.preventDefault();
      stylo = true;
      // on compléte la liste de coordonées
      clickX.push(e.pageX - canvas.offsetLeft);
      clickY.push(e.pageY - canvas.offsetTop);
      clickDrag.push(false);
      // permet de dessiner un point
      this.dessiner(context);
      e.stopPropagation();
    }.bind(this));

    // si le stylo est appuyé et est dans le canvas on dessine (glissement)
    canvas.addEventListener("mousemove", function (e) {
      e.preventDefault();
      if (stylo === true) {
        clickX.push(e.pageX - canvas.offsetLeft);
        clickY.push(e.pageY - canvas.offsetTop);
        clickDrag.push(true);
        this.dessiner(context);
      }
    }.bind(this));

    //Si le stylo est dans la feuille mais que la pointe est en l'air
    canvas.addEventListener("mouseup", function () {
      stylo = false;
    }, false);

    // si le stylo sort de la zonne canvas
    canvas.addEventListener("mouseleave", function () {
      stylo = false;
    }, false);

    //    -----------Evenements tactiles-----------//

    // instant où le doigt touche l'écran
    canvas.addEventListener("touchstart", function (e) {
      stylo = true;
      e.preventDefault();
      clickX.push(e.changedTouches[0].pageX - canvas.offsetLeft);
      clickY.push(e.changedTouches[0].pageY - canvas.offsetTop);
      clickDrag.push(false);
      this.dessiner(context);
    }.bind(this), false);
    // le doigt bouge sur avec l'écran
    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      if (stylo === true) {
        for (var i = 0; i < e.touches.length; i++) {
          clickX.push(e.targetTouches[i].pageX - canvas.offsetLeft);
          clickY.push((e.targetTouches[i].pageY - canvas.offsetTop));
          clickDrag.push(true);
        }
        this.dessiner(context);
      }
    }.bind(this), false);

    // le doigt n'est plus en contact avec l'écran
    canvas.addEventListener("touchend", function (e) {
      stylo = false;
    }, false);


    // à chaque appel de la méthode dessiner on efface le context et on redessine tout
    this.dessiner = function (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      this.click = clickX.length;
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
      }
      return;
    };
  };

  // methode clearCanvas sert à éffacer le canvas
  this.clearCanvas = function () {
    var canvas = document.getElementById(this.canvasId);
    context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
    sessionStorage.click = 0;
  };
}
