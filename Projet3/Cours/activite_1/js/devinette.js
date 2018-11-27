/* 
Activité : jeu de devinette
*/

// NE PAS MODIFIER OU SUPPRIMER LES LIGNES CI-DESSOUS
// COMPLETEZ LE PROGRAMME UNIQUEMENT APRES LE TODO

console.log("Bienvenue dans ce jeu de devinette !");

// Cette ligne génère aléatoirement un nombre entre 1 et 100
var solution = Math.floor(Math.random() * 100) + 1;
var i = 0
while (i <= 6) {
	i++
	var reponse = prompt("proposez moi un nombre");

	if (solution > reponse) {
		console.log('le nombre cherché est plus grand que ' + reponse);
		console.log('Il vous reste ' + (6 - i) + 'éssais');
	} else if (solution < reponse) {
		console.log('le nombre cherché est plus petit que ' + reponse);
		console.log('Il vous reste ' + (6 - i) + 'éssais');
	} else {
        console.log('Bravo vous avez trouvé le nombre, c\'etait : ' + solution);
      console.log('vous avez trouvé en ' + i + ' essai(s)')
	}

}
console.log('Dommage c\'est perdu');
console.log('la solution etait : ' + solution);
