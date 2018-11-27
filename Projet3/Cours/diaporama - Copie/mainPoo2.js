var Slider = {
  initSlider: function (id) {
    this.id = id;
  }
};

// construction des enfants
Slider.enfantDeux = function (id1, id2) {
  var fils = this.id + " " + id1 + " " + id2;
  return fils;
}
Slider.enfantUn = function (id1) {
  var fils = (this.id + " " + id1);
  return fils;
}



// constantes du slider
Slider.nbImages = function () {
  var nbImages = $(this.enfantDeux("ul", "li")).length;
  return nbImages;

};
Slider.largeur = function () {
  var largeur = $(this.enfantDeux("ul", "li")).width();
  return largeur;

};
Slider.hauteur = function () {
  var hauteur = $(this.enfantDeux("ul", "li")).height();
  return hauteur;

};
Slider.rajouter = function () {
  var rajout;
  rajout = $((this.enfantDeux("ul", "li:first_child").appendTo(this.enfantUn("ul")))).width();

  return rajout;

};
// déplacement du slider
Slider.moveRight = function () {
  $(this.enfantUn("ul")).animate({
    left: -this.largeur()
  }, 1000, $(this.enfantUn("ul")).css('left', this.rajouter()))
}

//Slider.prototype.moveLeft = function () {
//  $(this.filiation1("ul")).animate({
//    left: -this.largeur()
//  }, 1000, function () {
//    $(this.filiation2("ul", "li:last-child")).prependTo(this.filiation1("ul"));
//    this.filiation1("ul").css('left', '');
//  });
//}
//Slider.prototype.tempsPasse = function () {
//  var entreDeux
//  entreDeux = setInterval(function () {
//    this.moveRight();
//  }, 5000);
//  return entreDeux;
//};





$(document).ready(function () {
  var slider = Object.create(Slider);
  slider.initSlider("#slider");
  slider.moveRight();

  console.log(slider.enfantDeux("ul", "li"));
  console.log(slider.hauteur());
})



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
//var slider = new Slider("#slider", largeur, "#slider ul li:first-child", "#slider ul li:last-child")
//
//$(document).ready(function (slider) {
//  slider.tempsPasse()
//
//})
