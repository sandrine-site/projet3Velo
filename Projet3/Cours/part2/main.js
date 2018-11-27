var mots = [

	{

		terme: "Procrastination",

		definition: "Tendance pathologique à remettre systématiquement au lendemain"

    },

	{

		terme: "Tautologie",

		definition: "Phrase dont la formulation ne peut être que vraie"

    },

	{

		terme: "Oxymore",

		definition: "Figure de style qui réunit dans un même syntagme deux termes sémantiquement opposés"

    }

];
for (var i = 0; i < mots.length; i++) {
	document.getElementById("contenu").innerHTML += ("<dl> <dt><strong>" + journaux[(i, 1)] + "</strong></dt> <dd>" + journaux[(i, 2)]) + "</dd></dl>";
}
