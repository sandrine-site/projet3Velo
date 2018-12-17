//---------------------------calss ValidWindow------------------------------//

//Sert valider le formulaire ou lors du rechargement de la page
///idStation                     id du déscriptif de la station
//idNom                         fomulaire chanps du nom
// idPrenom                     fomulaire chanps du prenom

function ValidWindow(idStation, idNom, idPrenom) {
  this.idStation = idStation;
  this.idNom = idNom;
  this.idPrenom = idPrenom;
  // vérifiacation faites au chargement de la page
  this.StartFunction = function (click, nom, prenom) {
    if (Date.now() - sessionStorage.dateReservation <= 1200000) {
      document.getElementById(this.idStation).innerHTML += "<h3> Attention, vous avez déjà une réservation en cours, une nouvelle réservation entrainera une annulation de la précédente.<h3>";
      messageAfficheFin.ecrireMessage(click, nom, prenom, false);
    }
  }

  // lorsqu'on appuis sur le bouton annuler du formulaire
  this.ResetFunction = function () {

    signature.clearCanvas();
    document.getElementById(this.idNom).placeholder = '';
    document.getElementById(this.idPrenom).placeholder = '';
  };

  // lorsqu'on appuis sur le valider du formulaire
  this.ValidFunction = function (click, nom, prenom) {

    var nom = form.elements.nom.value;
    var prenom = form.elements.prenom.value;
    messageAfficheFin.ecrireMessage(click, nom, prenom, true);
  }
}
