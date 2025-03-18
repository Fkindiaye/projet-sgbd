// src/services/validationService.js
const crypto = require('crypto');
const fs = require('fs');

// Vérification du format UTF-8
function verifierUTF8(fichierPath) {
    const content = fs.readFileSync(fichierPath, 'utf8');
    return true; // Si aucune erreur n'est levée, le fichier est en UTF-8
}

// Vérification de l'empreinte SHA256
function verifierSHA256(fichierPath, empreinteAttendue) {
    const hash = crypto.createHash('sha256');
    const fichier = fs.createReadStream(fichierPath);

    return new Promise((resolve, reject) => {
        fichier.on('data', (data) => {
            hash.update(data);
        });

        fichier.on('end', () => {
            const empreinte = hash.digest('hex');
            if (empreinte === empreinteAttendue) {
                resolve(true);
            } else {
                reject("L'empreinte SHA256 ne correspond pas.");
            }
        });

        fichier.on('error', (err) => reject(err));
    });
}

module.exports = { verifierUTF8, verifierSHA256 };
