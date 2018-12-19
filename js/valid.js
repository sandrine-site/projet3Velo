//---------------------------calss ValidWindow------------------------------//

//Sert valider le formulaire ou lors du rechargement de la page
///idStation                     id du déscriptif de la station
//idNom                         fomulaire champs du nom
// idPrenom                     fomulaire champs du prenom
//idSignature                   lieu de la signature


function ValidWindow(idStation, idNom, idPrenom, idSignature, idform) {
  this.idStation = idStation;
  this.idNom = idNom;
  this.idPrenom = idPrenom;
  this.idSignature = idSignature;


  document.getElementById(this.idSignature).style.border = " 1px solid #363530";
  document.getElementById(this.idNom).style.border = " 1px solid #363530";
  document.getElementById(this.idPrenom).style.border = " 1px solid #363530";

  // vérification faites au chargement de la page

  this.StartFunction = function () {
    if (Date.now() - sessionStorage.dateReservation <= 1200000) {
      document.getElementById(this.idStation).innerHTML += "<h3> Attention, vous avez déjà une réservation en cours, une nouvelle réservation entrainera une annulation de la précédente.<h3>";
      messageAfficheFin.ecrireLoad();
    }

  }

  // lorsqu'on appuis sur le bouton annuler du formulaire
  this.ResetFunction = function () {

    signature.clearCanvas();
    document.getElementById(this.idNom).placeholder = '';
    document.getElementById(this.idPrenom).placeholder = '';
  };
  // lorsqu'on appuis sur le valider du formulaire
  this.ValidFunction = function () {
    var nom = document.formulaire.elements.nom.value;
    var prenom = document.formulaire.elements.prenom.value;
    if (signature.click == 0 || nom == "" || prenom == "") {
      if (signature.click == 0) {
        document.getElementById(this.idSignature).style.border = " 2px solid red";
      } else {
        document.getElementById(this.idSignature).style.border = " 1px solid #363530";
      }
      if (nom == "") {
        document.getElementById(this.idNom).style.border = " 2px solid red";
      } else {
        document.getElementById(this.idNom).style.border = " 1px solid #363530";
      }
      if (prenom == "") {
        document.getElementById(this.idPrenom).style.border = " 2px solid red";
      } else {
        document.getElementById(this.idPrenom).style.border = " 1px solid #363530";
      }
    } else { // Si le formulaire est valide on stocke le nom et le prenom dans une variable locale on efface le formulaire
      localStorage.nom = nom;
      localStorage.prenom = prenom;
      messageAfficheFin.ecrireMessage();
    }
    return false;
  }
}
