var monId = {

    Id: "",

    NbImages: function () {
      var nbImages = $((this.id).find(" ul li").length; console.log(nbImages);
          return nbImages;
        },
        Largeur: function () {
          var largeur = $(this.id).find(" ul li").width();
          console.log(largeur);
          return largeur;
        },
        Hauteur: function () {
          var hauteur = $(this.id).find(" ul li").height();
          return hauteur;
        },



        EntreDeux: function () {
          var entreDeux = setInterval(function () {
            this.moveRight;
          }, 5000);

        },


        LargeurTotale: function () {
          var largeurTotale = $(this.Id).Largeur * $(this.Id).NbImages;
          console.log(largeurTotale);
          return largeurTotale;
        },

        moveLeft: function () {
          $(this.Id).find("ul").animate({
            left: this.largeur
          }, 1000, function () {
            $(this.Id).find(" ul li:last_child").prependTo(this.id).find(" ul");
            $(this.Id).finf(" ul").css("left", "");
          })
        },

        moveRight: function () {
          $(this.Id).find("ul").animate({
            left: -this.largeur
          }, 1000, function () {
            $(this.Id).find("ul li:first_child").appendTo$(this.Id).find("ul");
            $(this.Id).find("ul").css("left", "");
          });
        },
        Dimension: function () {
          var dimensions = $(this.Id).css({
            width: this.Largeur,
            height: this.Hauteur
          });
        },
        PositionInitialeUL: function () {
          var positionIniUL = $(this.Id).find("ul").css({
            width: this.LargeurTotale,
            marginLeft: -this.Largeur
          });
        },
        SuiteSlider: function () {
          var suiteSlider = $(this.Id).find("ul li:last-child").prependTo(this.Id).find("ul");
        }
    };


    $(document).ready(function () {
      var slider = Object.create(monId);
      slider.Id = "#slider";
      slider.EntreDeux();
      slider.Dimension();
      slider.PositionInitialeUL();
      slider.SuiteSlider();
    });



    $("#slider ul li:last-child").prependTo('#slider ul');
