function init() {

  var body = document.getElementById("body");
  var canvas = document.getElementById("signature");
  var context = canvas.getContext("2d");
  var dessin = document.getElementById("dessin");
  var inputType = "mouse";

  //on ecrit définit le trait
  context.lineWidth = 1.5;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#3364fe";

  // on relie les évenements de la souris au dessin dans le canvas à l'aide d' EventListenner

  canvas.addEventListener("mousedown", function (e) {

    stylo = true;
    addClick(e.layerX - canvas.offsetLeft, (e.layerY - canvas.offsetTop) / 2);
    console.log(e.layerY - canvas.offsetTop + " = " + e.layerY + " - " + canvas.offsetTop);
    console.log(e.layerX - canvas.offsetLeft + " = " + e.layerX + " - " + canvas.offsetLeft);
    dessiner();
  });

  //stylo = pointe du stylo si =true =click souris =>on ecrit
  canvas.addEventListener("mouseup", function () {
    stylo = false;
  })

  // si le stylo est appuyé et dans le canvas on dessine
  canvas.addEventListener("mousemove", function (e) {
    if (stylo === true) {
      addClick(e.layerX - canvas.offsetLeft, (e.layerY - canvas.offsetTop) / 2);
      console.log(e.layerY - canvas.offsetTop + " = " + e.layerY + " - " + canvas.offsetTop);
      console.log(e.layerX - canvas.offsetLeft + " = " + e.layerX + " - " + canvas.offsetLeft);
      dessiner();
    }
  });

  // si le stylo sort de la zonne canvas on arrete le dessin
  canvas.addEventListener("mouseleave", function () {
    stylo = false;
  });

  //enregistrement de la position de la sourisdans un tableau;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var stylo;

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }
  //à chaque appel de la fonction dessiner on efface le context et on redessine tout
  function dessiner() {
    context.clearRect(0, 0, 300, 300);
    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i] - 1);
      }
      context.quadraticCurveTo(clickX[i], clickY[i], clickX[i + 1], clickY[i + 1]);
      context.closePath();
      context.stroke();
    }
  }
}

window.onload = init
