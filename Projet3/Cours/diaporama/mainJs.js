function Slider(id, temps) {

  this.id = id,
    this.temps = temps,


    //    Filiation du slider:

    Slider.prototype.enfantUn = function (id1) {
      var un = (this.id + " " + id1);
      return un;
    },
    Slider.prototype.enfantDeux = function (id1, id2) {
      var deux = this.enfantUn(id1) + " " + id2;
      return deux;
    },
    Slider.prototype.first = function (id1, id2) {
      var first = this.enfantDeux(id1, id2) + ":first-child";
      return first;
    },
    Slider.prototype.last = function (id1, id2) {
      var first = this.enfantDeux(id1, id2) + ":last-child";
      return first;
    },

    // constantes du slider
    Slider.prototype.nbImages = function (id1, id2) {

      var nbImages = document.querySelectorAll(this.enfantDeux("ul", "li")).length;

      return nbImages;

    },
    Slider.prototype.largeur = function (id1, id2) {
      var element = document.querySelector(this.first("ul", "li"));
      var largeur = element.offsetWidth;
      return largeur;

    },
    Slider.prototype.hauteur = function (id1, id2) {

      var element = document.querySelector(this.first("ul", "li"));
      var hauteur = element.offsetHeight;
      return hauteur;

    },

    //taille et dimensions du slider
    Slider.prototype.taille = function (id1, id2) {
      var Elt1 = document.querySelector(id);
      var Elt2 = document.querySelector(this.enfantUn(id1));
      Elt1.style.width = this.largeur(id1, id2);
      Elt1.style.height = this.hauteur(id1, id2);
      Elt2.style.width = this.largeur(id1, id2) * this.nbImages(id1, id2);
      Elt2.style.marginLeft = -this.largeur(id1, id2);

    };

  //deplacement des images du slider//
  Slider.prototype.moveRight = function (id1, id2) {
      console.log(this.enfantUn(id1));
      var Elt = document.querySelector(this.id);
      var pos = -(this.largeur(id1, id2))
      var changement = setInterval(ima, 2);
      console.log = (Elt);

      function ima() {
        pos = pos + 10;
        if (pos >= 0) {
          clearInterval(changement);
          document.querySelector(id).removeChild(document.getElementById(this.first(id1, id2)));
          document.appendChild(this.first(id1, id2));
        } else {
          Elt.style.marginLeft = pos + 'px';

        }

      }


      //      console.log(i);
      //      
      //      var EltFirst = document.querySelector(this.first(id1, id2));
      //      Elt.style.marginLeft = -this.largeur(id1, id2)
      //      console.log(Elt);
      //      console.log(EltFirst);
      //      console.log("< li  id= slide" + i + "> </li>")
      //      var anim = animate({
      //Elt: Elt.insertAdjacentHTML("beforeEnd", "< li  id= slide" + i + "> </li>"),
      //          "marginLeft": 0
      //        },
      //        1000
      //      );
      //      i++;
    },



    Slider.prototype.tempsImage = function (id1, id2) {
      var that = this
      console.log(this.enfantDeux(id1, id2));
      var changementIma = setInterval(
        that.moveRight(id1, id2),

        1000);



    };
}




//document.querySelector(first(id1, id2)).insertBefore(this.enfantUn(id1)),

//  $('#slider ul').animate({
//    left: -largeur
//  }, 1000, function () {
//    $("#slider ul li:first-child").appendTo('#slider ul');
//    $("#slider ul").css('left', '');
//  });
//};






var slider = new Slider("#slider", 5000);
var i = 1;
//$('#slider').css({
//  width: largeur,
//  height: hauteur
//});
//$('#slider ul').css({
//  width: largeurTotale,
//  marginLeft: -largeur
//});

slider.taille("ul", "li");
slider.tempsImage("ul", "li");

////mouvement normal du slider//
//
//var entreDeux;
//
//entreDeux = setInterval(function () {
//  moveRight();
//}, 5000);
//
//// mouvement avec les fleches clavier//
//
//$(document).on("keydown", function (e) {
//  if (e.keyCode === 39) {
//    clearInterval(entreDeux);
//    moveLeft();
//
//  } else if (e.keyCode === 37) {
//    clearInterval(entreDeux);
//    moveRight();
//  }
//  entreDeux = setInterval(function () {
//    moveRight();
//  }, 5000);
//});
//
//// commande avec la souris + icones//
//
//$('#flecherecul').on('click', function () {
//  clearInterval(entreDeux);
//  moveLeft();
//})
//$('#flecheavance').on('click', function () {
//  clearInterval(entreDeux);
//  moveRight();
//})
//
////commande du play-stop//
//
//$('#control').on('click', function () {
//  if ($('#control').hasClass('pause')) {
//    clearInterval(entreDeux);
//    $('#control i').removeClass("fa fa-pause").addClass('fas fa-play');
//    $('#control').removeClass('pause').addClass('play');
//  } else if ($('#control').hasClass('play')) {
//    entreDeux = setInterval(function () {
//      moveRight();
//    }, 5000);
//    $('#control i').removeClass("fa fa-play").addClass('fas fa-pause');
//    $('#control').removeClass('play').addClass('pause');
//  }
//})
//
//
////dimensions du slider//
//var nbImages = $("#slider ul li").length;
//var largeur = $("#slider ul li").width();
//var hauteur = $("#slider ul li").height();
//var largeurTotale = nbImages * largeur;
//
//
//$('#slider').css({
//  width: largeur,
//  height: hauteur
//});
//$('#slider ul').css({
//  width: largeurTotale,
//  marginLeft: -largeur
//});
//// on boucle le slider pour qu'il soit continu//
//$("#slider ul li:last-child").prependTo('#slider ul');
//
////deplacement des images du slider//
//function moveRight() {
//  $('#slider ul').animate({
//    left: -largeur
//  }, 1000, function () {
//    $("#slider ul li:first-child").appendTo('#slider ul');
//    $("#slider ul").css('left', '');
//  });
//};
//
//function moveLeft() {
//  $('#slider ul').animate({
//    left: largeur
//  }, 1000, function () {
//    $("#slider ul li:last-child").prependTo('#slider ul');
//    $("#slider ul").css('left', '');
//  });
//};
//});
