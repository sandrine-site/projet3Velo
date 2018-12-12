function Slider(id, temps, largeurPourcent, nbImages, idControl, idAvance, IdRecul, IdTouch, document) {
  this.id = id,
    this.temps = temps,
    this.largeurPourcent = largeurPourcent,
    this.nbImages = nbImages,
    this.idControl = idControl,
    this.idAvance = idAvance,
    this.idRecul = IdRecul,
    this.idTouch = IdTouch;
  this.document = document,


    // enfants du silder:

    Slider.prototype.enfantUn = function () {
      var un = ("#" + this.id + " ul");

      return un;
    };
  Slider.prototype.enfantDeux = function () {
    var deux = ("#" + this.id + " ul li");
    return deux;
  };
  Slider.prototype.first = function () {
    var first = "#" + this.id + " ul li:first-child";
    return first;
  };
  Slider.prototype.last = function () {
    var last = "#" + this.id + " ul li:last-child";
    return last;
  };

  // constantes du slider

  Slider.prototype.largeurContenant = function () {
    var largeurCont = this.nbImages * 100;
    return largeurCont;
  };
  Slider.prototype.taille = function () {
    for (var i = 1; i <= this.nbImages; i++) {
      $("#slide" + i).css('width', 100 / nbImages + "%")
    };
    $(this.enfantUn()).css('width', (this.largeurContenant() + "%"));
  };

  //déplacement du slider

  Slider.prototype.boucle = function () {
    $(this.first()).appendTo(this.enfantUn());
    $(this.enfantUn()).css('left', "");
  };
  Slider.prototype.boucleLeft = function () {
      $(this.last()).prependTo(this.enfantUn());
      $(this.enfantUn()).css('left', "");
    },
    Slider.prototype.moveLeft = function () {
      var dep = 100;
      $(this.enfantUn()).animate({
          'left': (dep + '%')
        }, temps / 5,
        this.boucleLeft.bind(this));

      return dep;
    };
  Slider.prototype.moveRight = function () {
    var dep = -100;
    $(this.enfantUn()).animate({
        'left': (dep + '%')
      }, temps / 5,
      this.boucle.bind(this));

    return dep;
  };
  Slider.prototype.imageReste = function () {
    if (play === 1) {
      entreDeux = setInterval(

        this.moveRight.bind(this), temps);
    } else {
      clearInterval(entreDeux);
    }
  };

  // commande avec la souris + icones//

  Slider.prototype.commandeRecul = function () {
    clearInterval(entreDeux);
    this.moveRight();
    this.imageReste();
  };
  Slider.prototype.commandeAvance = function () {
    clearInterval(entreDeux);
    this.moveLeft();
    this.imageReste();
  };
  //  commandePause=function()
  Slider.prototype.commandePause = function () {
    if ($(this.idControl).hasClass('pause')) {
      play = 0;
      clearInterval(entreDeux);
      $(this.idControl + " i").removeClass("fa fa-pause").addClass('fas fa-play');
      $(this.idControl).removeClass('pause').addClass('play');
    } else if ($(this.idControl).hasClass('play')) {
      play = 1;
      this.imageReste()
      $(this.idControl + " i").removeClass("fa fa-play").addClass('fas fa-pause');
      $(this.idControl).removeClass('play').addClass('pause');
    }
  };
  // commande avec la souris + icones//
  $(this.idRecul).on('click', function () {
    this.commandeRecul();

  }.bind(this));
  $(this.idAvance).on('click', function () {
    this.commandeAvance();

  }.bind(this));
  // mouvement avec les fleches clavier//

  $(this.document).on("keydown", function (e) {
    if (e.keyCode === 39) {
      this.commandeRecul();
    } else if (e.keyCode === 37) {
      this.commandeAvance();
    }
  }.bind(this));

  //commande du play-stop//
  $(idControl).on('click', function () {
    this.commandePause();
  }.bind(this));




  var touchsurface = document.getElementById("presentationslider");
  var startX;
  var distX;
  var swipMin = 50; //distance de déplacement minimale pour que le swipe soit pris en compte 
  var TemsMax = 300; // durée maximale du swipe
  var tempsEcoule;
  var startTime;

  touchsurface.addEventListener('touchstart', function (e) {
    var touchobj = e.changedTouches[0];
    console.log("dffjdkfjfds");
    dirrectionSwipe = 'none';
    dist = 0;
    startX = touchobj.pageX;
    startTime = new Date().getTime(); //commence à compter le temps
    e.preventDefault();
  }, false);

  $(touchsurface).on('touchmove', function (e) {
    e.preventDefault();
  }, false)

  $(touchsurface).on('touchend', function (e) {
    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX // mesure la distanceparcourue par le doigt
    tempsEcoule = new Date().getTime() - startTime // temps Ecoulé
    if (tempsEcoulee <= TemsMax) { // first condition for awipe met
      if (Math.abs(distX) >= swipMin && dist < 0) {
        this.commandeAvance();
      } else if (Math.abs(distX) >= swipMin && dist > 0) {
        this.commandeRecul();
      }
    }
    e.preventDefault();
    e.stopPropagation()
  }, false);
  $(touchsurface).on("swiperight", function (e) {
    this.moveRight.bind(this);
    e.preventDefault;
    e.stopPropagation();
  })
  $(touchsurface).on("swipeleft", function (e) {
    this.moveLeft.bind(this);
    e.preventDefault;
    e.stopPropagation();
  })

}




//on fixe comme constantes de départ:
//l'id du slider                      ici #slider
//le temps de chaque diapo en ms      ici 5000
//la largeur du slider en pourcent    ici 50
//le nombre d'images du slider        ici 4
//l'id des controles                  ici #control
//                                    #flecheavance
//                                    #flecherecul

var slider = new Slider("slider", 5000, 50, 5, "#control", "#flecheavance", "#flecherecul", "touchsurface",
  document);
var play = 1
var entreDeux;
slider.taille();
slider.imageReste();
