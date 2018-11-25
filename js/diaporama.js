function Slider(id, temps, largeurPourcent, nbImages, idControl) {
  this.id = id,
    this.temps = temps,
    this.largeurPourcent = largeurPourcent,
    this.nbImages = nbImages,
    this.idControl = idControl,

    // enfants du silder:

    Slider.prototype.enfantUn = function () {
      var un = (this.id + " ul");

      return un;
    },
    Slider.prototype.enfantDeux = function () {
      var deux = (this.id + " ul li");
      return deux;
    },
    Slider.prototype.first = function () {
      var first = this.id + " ul li:first-child";
      return first;
    },
    Slider.prototype.last = function () {
      var last = this.id + " ul li:last-child";
      return last;
    },

    // constantes du slider

    Slider.prototype.largeurContenant = function () {
      var largeurCont = this.nbImages * 100;
      return largeurCont;
    },
    Slider.prototype.taille = function () {
      for (i = 1; i <= this.nbImages; i++) {
        $("#slide" + i).css('width', 100 / nbImages + "%")
      };
      $(this.enfantUn()).css('width', (this.largeurContenant() + "%"));
    },

    //déplacement du slider

    Slider.prototype.boucle = function () {
      $(this.first()).appendTo(this.enfantUn());
      $(this.enfantUn()).css('left', "");
    },
    Slider.prototype.boucleLeft = function () {
      $(this.last()).prependTo(this.enfantUn());
      $(this.enfantUn()).css('left', "");
    },
    Slider.prototype.moveLeft = function () {
      var dep = 100;
      $(this.enfantUn()).animate({
        'left': (dep + '%')
      }, temps / 5, function () {
        slider.boucleLeft();
      })
      return dep;
    },
    Slider.prototype.moveRight = function () {
      var dep = -100;
      $(this.enfantUn()).animate({
        'left': (dep + '%')
      }, temps / 5, function () {
        slider.boucle();
      })
      return dep;
    },
    Slider.prototype.imageReste = function () {
      entreDeux = setInterval(function () {
        slider.moveRight();
      }, temps);
    }

  // commande avec la souris + icones//

  Slider.prototype.commandeRecul = function () {
      clearInterval(entreDeux);
      this.moveRight();
      this.imageReste();
    },
    Slider.prototype.commandeAvance = function () {
      clearInterval(entreDeux);
      this.moveLeft();
      this.imageReste();
    },
    Slider.prototype.commandePause = function () {
      if ($(this.idControl).hasClass('pause')) {
        clearInterval(entreDeux);
        $(this.idControl + " i").removeClass("fa fa-pause").addClass('fas fa-play');
        $(this.idControl).removeClass('pause').addClass('play');
      } else if ($(this.idControl).hasClass('play')) {
        slider.imageReste()
        $(this.idControl + " i").removeClass("fa fa-play").addClass('fas fa-pause');
        $(this.idControl).removeClass('play').addClass('pause');
      }
    };
}

//on fixe comme constantes de départ:
//l'id du slider                      ici #slider
//le temps de chaque diapo en ms      ici 5000
//la largeur du slider en pourcent    ici 50
//le nombre d'images du slider        ici 4
//l'id des controles                  ici #control

var slider = new Slider("#slider", 5000, 50, 5, "#control");

var entreDeux;
slider.taille();
slider.imageReste();

// commande avec la souris + icones//
$('#flecherecul').on('click', function () {
  slider.commandeRecul();
  play = 1;
});
$('#flecheavance').on('click', function () {
  slider.commandeAvance();
  play = 1;
});
// mouvement avec les fleches clavier//

$(document).on("keydown", function (e) {
  if (e.keyCode === 39) {
    slider.commandeRecul();
  } else if (e.keyCode === 37) {
    slider.commandeAvance();
  }
});

//commande du play-stop//

$('#control').on('click', function () {
  slider.commandePause();
})
