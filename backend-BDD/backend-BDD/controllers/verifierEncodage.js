const chardet = require('chardet');
const fs = require('fs');

// Fonction pour vérifier l'encodage d'un fichier
function verifierEncodage(fichier) {
  // Lire le fichier en binaire
  const contenu = fs.readFileSync(fichier);

  // Utiliser chardet pour détecter l'encodage
  const encodage = chardet.detect(contenu);

  // Vérifier si l'encodage est UTF-8
  if (encodage === 'UTF-8') {
    console.log('Le fichier est encodé en UTF-8');
  } else {
    console.log('Le fichier n\'est pas encodé en UTF-8, encodage détecté:', encodage);
  }
}

// Exemple d'utilisation de la fonction
const fichierCSV = 'chemin/vers/votre/fichier.csv'; // Remplacez par le chemin réel de votre fichier CSV
verifierEncodage(fichierCSV);
