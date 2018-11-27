function trouverLettreLeet(lettre) {
  var leet
  switch (lettre) {
    case "a":
      leet = "4";
      break;
    case "b":
      leet = "8";
      break;
    case "e":
      leet = 3;
      break;
    case "l":
      leet = "1";
      break;
    case "o":
      leet = "0";
      break;
    case "s":
      leet = "5"
      break;
  }
  return leet;

}

function convertirEnLeet(mot) {
  var minuscule = mot.toLowerCase();
  var motConverti = "";
  for (i = 0; i < mot.length; i++) {
    if (minuscule[i] === "a" || minuscule[i] === "b" || minuscule[i] === "e" || minuscule[i] === "l" || minuscule[i] === "o" || minuscule[i] === "s") {
      motConverti = motConverti + trouverLettreLeet(minuscule[i]);
    } else {
      motConverti = motConverti + mot[i];
    }
  }
  return motConverti;
}
var mot = prompt("entrez le mot à convertir")
console.log("le mot " + mot + "converti en letter speak donne " + convertirEnLeet(mot));
