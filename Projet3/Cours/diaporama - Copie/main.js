$(document).ready(function ($) {

  //mouvement normal du slider//

  var entreDeux;

  entreDeux = setInterval(function () {
    moveRight();
  }, 5000);

  // mouvement avec les fleches clavier//

  $(document).on("keydown", function (e) {
    if (e.keyCode === 39) {
      clearInterval(entreDeux);
      moveLeft();

    } else if (e.keyCode === 37) {
      clearInterval(entreDeux);
      moveRight();
    }
    entreDeux = setInterval(function () {
      moveRight();
    }, 5000);
  });

  // commande avec la souris + icones//

  $('#flecherecul').on('click', function () {
    clearInterval(entreDeux);
    moveLeft();
  })
  $('#flecheavance').on('click', function () {
    clearInterval(entreDeux);
    moveRight();
  })

  //commande du play-stop//

  $('#control').on('click', function () {
    if ($('#control').hasClass('pause')) {
      clearInterval(entreDeux);
      $('#control i').removeClass("fa fa-pause").addClass('fas fa-play');
      $('#control').removeClass('pause').addClass('play');
    } else if ($('#control').hasClass('play')) {
      entreDeux = setInterval(function () {
        moveRight();
      }, 5000);
      $('#control i').removeClass("fa fa-play").addClass('fas fa-pause');
      $('#control').removeClass('play').addClass('pause');
    }
  })


  //dimensions du slider//
  var nbImages = $("#slider ul li").length;
  var largeur = $("#slider ul li").width();
  var hauteur = $("#slider ul li").height();
  var largeurTotale = nbImages * largeur;


  $('#slider').css({
    width: largeur,
    height: hauteur
  });
  $('#slider ul').css({
    width: largeurTotale,
    marginLeft: -largeur
  });
  // on boucle le slider pour qu'il soit continu//
  $("#slider ul li:last-child").prependTo('#slider ul');

  //deplacement des images du slider//
  function moveRight() {
    $('#slider ul').animate({
      left: -largeur
    }, 1000, function () {
      $("#slider ul li:first-child").appendTo('#slider ul');
      $("#slider ul").css('left', '');
    });
  };

  function moveLeft() {
    $('#slider ul').animate({
      left: largeur
    }, 1000, function () {
      $("#slider ul li:last-child").prependTo('#slider ul');
      $("#slider ul").css('left', '');
    });
  };
});
