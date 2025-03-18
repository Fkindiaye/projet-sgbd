// src/controllers/fichierController.js
const { verifierUTF8, verifierSHA256 } = require('../services/validationService');
const { chargerCSVDansTableTemporaire, transfererVersTablePermanente, nettoyerTableTemporaire } = require('../services/dbService');
const fs = require('fs');

// Exemple d'utilisation des fonctions dans le contrôleur
async function validerEtTransferer(fichierPath, empreinteAttendue) {
    try {
        if (verifierUTF8(fichierPath)) {
            console.log("Le fichier est en UTF-8.");
            const sha256Valide = await verifierSHA256(fichierPath, empreinteAttendue);
            if (sha256Valide) {
                console.log("L'empreinte SHA256 est valide.");
                const data = fs.readFileSync(fichierPath, 'utf8'); // Lecture du fichier
                const rows = data.split('\n').map((row) => row.split(',')).map((row) => ({
                    nom: row[0], prenom: row[1], cin: row[2]
                }));

                await chargerCSVDansTableTemporaire(rows);
                await transfererVersTablePermanente();
                await nettoyerTableTemporaire();
                console.log("Les données ont été transférées avec succès et la table temporaire est nettoyée.");
            }
        }
    } catch (err) {
        console.error("Erreur lors de la validation ou du transfert: ", err);
    }
}

module.exports = { validerEtTransferer };
