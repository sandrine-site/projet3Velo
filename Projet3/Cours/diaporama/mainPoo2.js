function Slider(id, temps, largeurpc) {
  this.id = id,
    this.temps = temps,
    this.largeurpc = largeurpc,


    // enfants du silder:

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
      var nbImages = $(this.enfantDeux(id1, id2)).length;
      return nbImages;
    };
  Slider.prototype.largeur = function () {
      var largeur = (($(document).width() * this.largeurpc) / 100);

    },
    Slider.prototype.hauteur = function (id1, id2) {
      var hauteur = $(this.enfantDeux(id1, id2)).height();
      return hauteur;
    },
    Slider.prototype.taille = function (id1, id2) {
      $(this.enfantDeux(id1, id2)).css('width', this.largeur());
      $(this.id).css('height', this.hauteur(id1, id2));
      $(this.enfantUn(id1)).css("marginLeft", -this.largeur());
      $(this.enfantUn(id1)).css('width', (this.largeur()));
      $(this.last(id1, id2)).prependTo(this.enfantUn(id1));
      for (i = 1; i <= this.nbImages(id1, id2)) {
        $("#slide" + i).css('width', this.largeur());
      }
    },
    Slider.prototype.boucle = function (id1, id2) {
      $(this.last(id1, id2)).prependTo(this.enfantUn(id1));
      $(this.enfantUn(id1)).css('left', '');
    };
  //déplacement du slider
  Slider.prototype.moveRight = function (id1, id2) {


    if (play = 1) {
      $(this.enfantUn(id1)).animate({

        'left': (-this.largeur() / 4)
      }, 1000, this.boucle(id1, id2));

    };
    $(this.first(id1, id2)).appendTo(this.enfantUn("id1"));
  };
  //    $(this.first(id1, id2)).appendTo(this.enfantUn(id1));
  //    console.log(this);
  //      $(this.first(id1, id2)).appendTo(this.enfantUn(id1));
  //        $(this.enfantUn(id1)).css('left',
  //          '');




};









//Identifiant.rajouter = function (first) {
//  var rajout;
//
//  rajout = $(first).appendTo(first);
//  first.css('left', '')
//
//
//  return rajout;
//
//};
//déplacement du slider
//  Identifiant.moveRight = function (id1, id2) {
//    console.log(this);
//    $(this.enfantUn(id1)).animate({
//
//        'left': -this.largeur()
//      }, 1000,
//      function (id1, id2) {
//        console.log(this);
//        //      $(this.first(id1, id2)).appendTo(this.enfantUn(id1));
//        $(this.enfantUn(id1)).css('left',
//          '');
//      }).bind(this);
//  };


//
//Identifiant.moveLeft = function () {
//  $(this.enfantUn("ul")).animate({
//    'left': this.largeur()
//  }, 1000, function () {
//    $(this).prependTo(this);
//    $(this).css({
//      'left': ''
//    });
//  });
//};
//
//Identifiant.tempsPasse = function (id1, id2) {
//  var entreDeux;
//  entreDeux = setInterval(
//    this.moveRight(id1, id2).bind(this), 5000);
//  return entreDeux;
//};
//
var slider = new Slider("#slider", 5000, 50)
//  var first = $(slider.enfantUn("ul"))


play = 1


//  }
////dimensions du slider//
//var nbImages = $("#slider ul li").length;
//var largeur = $("#slider ul li").width();
//var hauteur = $("#slider ul li").height();
//var largeurTotale = nbImages * largeur;
//
//$('#slider').css({
//  width: largeur,
//  height: hauteur
//});
//$('#slider ul').css({
//  width: largeurTotale,
//  marginLeft: -largeur
//});
//var slider = new Identifiant("#slider", largeur, "#slider ul li:first-child", "#slider ul li:last-child")
//
//$(document).ready(function (slider) {
//  slider.tempsPasse()
//
//})
